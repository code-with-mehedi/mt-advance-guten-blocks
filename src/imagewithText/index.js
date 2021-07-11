const { registerBlockType } = wp.blocks;
const {
  RichText,
  MediaUpload,
  AlignmentToolbar,
  BlockControls,
  URLInputButton,
} = wp.blockEditor;
const { Button, IconButton } = wp.components;
import { ReactComponent as Logo } from "../logo.svg";

registerBlockType("mtgtab/image-with-text", {
  title: "Image with Text",
  category: "mt-blocks",
  icon: { src: Logo },
  attributes: {
    blockHeading: {
      type: "string",
      source: "html",
      selector: ".content h1",
    },
    blockContent: {
      type: "string",
      source: "html",
      selector: ".content p",
    },
    blockImage: {
      type: "string",
      source: "attribute",
      attribute: "src",
      selector: ".image img",
    },
    btnUrl: {
      type: "string",
    },
    alignContent: {
      type: "string",
      default: "center",
    },
  },
  supports: {
    align: ["wide", "full"],
  },
  styles: [
    {
      name: "default",
      label: "Blue (Default)",
      isDefault: true,
    },
    {
      name: "green",
      label: "Green",
    },
    {
      name: "pink",
      label: "Pink",
    },
  ],
  edit: (props) => {
    //extract props
    const {
      attributes: {
        blockHeading,
        blockContent,
        blockImage,
        btnUrl,
        alignContent,
      },
      setAttributes,
    } = props;
    return (
      <>
        <div className="image-text-block">
          <div className="container">
            <div className="content">
              <BlockControls>
                <AlignmentToolbar
                  onChange={(newAlign) =>
                    setAttributes({ alignContent: newAlign })
                  }
                />
              </BlockControls>
              <h1>
                <RichText
                  value={blockHeading}
                  onChange={(newTitle) =>
                    setAttributes({ blockHeading: newTitle })
                  }
                  placeholder="Add Title"
                  style={{ textAlign: alignContent }}
                />
              </h1>
              <p>
                <RichText
                  value={blockContent}
                  onChange={(newContent) =>
                    setAttributes({ blockContent: newContent })
                  }
                  style={{ textAlign: alignContent }}
                  placeholder="Add Content"
                />
              </p>
              <a
                href={btnUrl}
                className="button"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textAlign: alignContent }}
              >
                Download
              </a>

              <URLInputButton
                url={btnUrl}
                onChange={(newUrl) => {
                  setAttributes({ btnUrl: newUrl });
                }}
              />
            </div>

            <div className="image">
              <img src={blockImage} style={{ textAlign: alignContent }} />
              <MediaUpload
                onSelect={(newImg) =>
                  setAttributes({ blockImage: newImg.sizes.medium.url })
                }
                type="image"
                render={({ open }) => (
                  <IconButton
                    onClick={open}
                    icon="format-image"
                    showTooltip="true"
                    label="Uload Image"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </>
    );
  },

  save: (props) => {
    //extract props
    const {
      attributes: {
        blockHeading,
        blockContent,
        blockImage,
        btnUrl,
        alignContent,
      },
    } = props;
    return (
      <>
        <div className="image-text-block">
          <div className="container">
            <div className="content">
              <h1 style={{ textAlign: alignContent }}>
                <RichText.Content value={blockHeading} />
              </h1>
              <p style={{ textAlign: alignContent }}>
                <RichText.Content value={blockContent} />
              </p>
              <a
                href={btnUrl}
                className="button"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textAlign: alignContent }}
              >
                Download
              </a>
            </div>

            <div className="image">
              <img src={blockImage} />
            </div>
          </div>
        </div>
      </>
    );
  },
});
