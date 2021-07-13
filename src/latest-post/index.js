const { registerBlockType } = wp.blocks;
const {
  RichText,
  MediaUpload,
  AlignmentToolbar,
  BlockControls,
  URLInputButton,
} = wp.blockEditor;
const { withSelect } = wp.data;
const { Button, IconButton } = wp.components;
import { ReactComponent as Logo } from "../logo.svg";

registerBlockType("mtgtab/latest-post", {
  title: "Latest Posts",
  category: "mt-blocks",
  icon: { src: Logo },
  attributes: {
    name: {
      type: "string",
    },
  },
  edit: withSelect((select) => {
    return {
      //send get request to wp rest api
      posts: select("core").getEntityRecords("postType", "post", {
        per_page: 3,
      }),
    };
  })(({ posts }) => {
    console.log(posts);
    if (!posts) {
      return "Loading...";
    }
    if (posts && posts.length === 0) {
      return "There is no posts";
    }
    return (
      <>
        <div className="section">
          <h1>Latest Posts</h1>
          <ul className="latest-recipes container">
            {posts.map((post) => {
              return (
                <>
                  <li>
                    <img src={post.featured_image_url} />
                    <div className="content">
                      <h2>{post.title.rendered}</h2>
                      <p>
                        <RichText value={post.excerpt.rendered} />
                      </p>
                      <a href={post.link} className="button">
                        Read More
                      </a>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      </>
    );
  }),

  save: () => {
    return null;
  },
});
