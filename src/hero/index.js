const { registerBlockType } = wp.blocks;
const {
  RichText,
  MediaUpload,
  AlignmentToolbar,
  BlockControls,
} = wp.blockEditor;
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
    heroBackground: {
      type: "string",
    },
    heroAlignment: {
      type: "string",
      default: "center",
    },
  },
  supports: {
    align: ["wide", "full"],
  },
  edit: (props) => {
    console.log(props);
    //extract props
    const {
      attributes: { heroTitle, heroContent, heroBackground, heroAlignment },
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
    //set attribute testimonial image
    const onSelectHeroBg = (media) => {
      setAttributes({ heroBackground: media.sizes.medium.url });
    };
    //Set Hero Item Alignment
    const alignHero = (newAlign) => {
      setAttributes({ heroAlignment: newAlign });
    };
    return (
      <>
        <div class="section">
          <div
            class="hero-block"
            style={{ backgroundImage: `url(${heroBackground})` }}
          >
            <BlockControls>
              <AlignmentToolbar onChange={alignHero} />
            </BlockControls>

            <MediaUpload
              onSelect={onSelectHeroBg}
              type="image"
              render={({ open }) => (
                <IconButton
                  onClick={open}
                  icon="format-image"
                  showTooltip="true"
                  label="Uload Background"
                />
              )}
            />
            <h1 style={{ textAlign: heroAlignment }}>
              <RichText
                value={heroTitle}
                onChange={editHeroTitle}
                placeholder="Add Hero Title"
              />
            </h1>
            <p style={{ textAlign: heroAlignment }}>
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
      attributes: { heroTitle, heroContent, heroBackground, heroAlignment },
    } = props;
    return (
      <>
        <div class="section">
          <div
            class="hero-block"
            style={{ backgroundImage: `url(${heroBackground})` }}
          >
            <h1 style={{ textAlign: heroAlignment }}>
              <RichText.Content value={heroTitle} />
            </h1>
            <p style={{ textAlign: heroAlignment }}>
              <RichText.Content value={heroContent} />
            </p>
          </div>
        </div>
      </>
    );
  },
});
