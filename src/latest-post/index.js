const { registerBlockType } = wp.blocks;
const {
  RichText,
  MediaUpload,
  AlignmentToolbar,
  BlockControls,
  URLInputButton,
  InspectorControls,
} = wp.blockEditor;
const { withSelect } = wp.data;
const {
  Button,
  IconButton,
  SelectControl,
  RangeControl,
  PanelBody,
} = wp.components;
import { ReactComponent as Logo } from "../logo.svg";

registerBlockType("mtgtab/latest-post", {
  title: "Latest Posts",
  category: "mt-blocks",
  icon: { src: Logo },
  attributes: {
    name: {
      type: "string",
    },
    numberOfPosts: {
      type: "number",
      default: 3,
    },
    postCategories: {
      type: "string",
    },
  },
  edit: withSelect((select, props) => {
    const {
      attributes: { name, numberOfPosts, postCategories },
    } = props;
    return {
      //send get request to wp rest api
      posts: select("core").getEntityRecords("postType", "post", {
        per_page: numberOfPosts,
      }),
      categories: select("core").getEntityRecords("taxonomy", "category", {
        per_page: -1,
      }),
    };
  })(({ posts, categories, attributes, setAttributes }) => {
    const { numberOfPosts, postCategories } = attributes;
    if (!posts) {
      return "Loading...";
    }
    if (posts && posts.length === 0) {
      return "There is no posts";
    }
    const setCategories = (newCategory) => {
      setAttributes({
        postCategories: newCategory,
      });
    };
    return (
      <>
        <InspectorControls>
          <PanelBody>
            <RangeControl
              onChange={(numPosts) =>
                setAttributes({ numberOfPosts: numPosts })
              }
              value={numberOfPosts}
              label="Number of posts"
              min="3"
              max="10"
            />
            <SelectControl
              label="Select Category"
              onChange={setCategories}
              value={postCategories}
              options={
                categories &&
                categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))
              }
            />
          </PanelBody>
        </InspectorControls>
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
