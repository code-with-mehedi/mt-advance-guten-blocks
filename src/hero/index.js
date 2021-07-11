const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, IconButton } = wp.components;
import { ReactComponent as Logo } from "../logo.svg";

registerBlockType("mtgtab/hero", {
  title: "Hero Block",
  category: "mt-blocks",
  icon: "superhero",
  attributes: {
    heroTitle: {
      type: "string",
      source: "html",
      selector: ".hero-block h1",
    },
    heroContent: {
      type: "string",
      source: "html",
      selector: ".hero-block p",
    },
  },
  edit: (props) => {
    console.log(props);
    //extract props
    const {
      attributes: { heroTitle, heroContent },
      setAttributes,
    } = props;
    //Hero Title
    const editHeroTitle = (title) => {
      setAttributes({ heroTitle: title });
    };
    //Hero Content
    const editHeroContent = (content) => {
      setAttributes({ heroContent: content });
    };

    return (
      <>
        <div class="section">
          <div class="hero-block">
            <h1>
              <RichText
                value={heroTitle}
                onChange={editHeroTitle}
                placeholder="Add Hero Title"
              />
            </h1>
            <p>
              <RichText
                value={heroContent}
                onChange={editHeroContent}
                placeholder="Add Hero Content"
              />
            </p>
          </div>
        </div>
      </>
    );
  },
  save: (props) => {
    //extract props
    const {
      attributes: { heroTitle, heroContent },
    } = props;
    return (
      <>
        <div class="section">
          <div class="hero-block">
            <h1>
              <RichText.Content value={heroTitle} />
            </h1>
            <p>
              <RichText.Content value={heroContent} />
            </p>
          </div>
        </div>
      </>
    );
  },
});
