const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload } = wp.blockEditor;
const { Button, IconButton } = wp.components;
import { ReactComponent as Logo } from "../logo.svg";

registerBlockType("mtgtab/testimonial", {
  title: "Testimonial",
  category: "mt-blocks",
  attributes: {
    testiMonialText: {
      type: "string",
      source: "html",
      selector: ".testimonial-block blockquote",
    },
    testiMonialAuthor: {
      type: "string",
      source: "html",
      selector: ".testimonial-info p",
    },
    testiMonialImage: {
      type: "string",
      source: "attribute",
      selector: ".testimonial-info img",
    },
  },
  icon: { src: Logo },

  edit: (props) => {
    console.log(props);
    //extract attributes value
    const {
      attributes: { testiMonialText, testiMonialAuthor, testiMonialImage },
      setAttributes,
    } = props;
    //Set attribute testimonial text
    const saveTestionalTex = (newTesti) => {
      setAttributes({ testiMonialText: newTesti });
    };

    //set attribute testimonial image
    const onSelectImage = (media) => {
      setAttributes({ testiMonialImage: media.sizes.medium.url });
    };
    return (
      <>
        <h1>Testimonial Block</h1>
        <div className="testimonial-block">
          <blockquote>
            <RichText
              placeholder="Add testimonial text"
              onChange={saveTestionalTex}
              value={testiMonialText}
            />
          </blockquote>
          <div className="testimonial-info">
            <img src={testiMonialImage} />
            <MediaUpload
              onSelect={onSelectImage}
              type="image"
              value={testiMonialImage}
              render={({ open }) => (
                <IconButton
                  onClick={open}
                  icon="format-image"
                  showTooltip="true"
                  label="Add Image"
                />
              )}
            />
            <p>
              <RichText
                placeholder="Add the Name of the Person"
                value={testiMonialAuthor}
                onChange={(testiAuthor) =>
                  setAttributes({ testiMonialAuthor: testiAuthor })
                }
              />
            </p>
          </div>
        </div>
      </>
    );
  },
  save: (props) => {
    const {
      attributes: { testiMonialText, testiMonialAuthor, testiMonialImage },
    } = props;
    return (
      <>
        <h1>Testimonial Block</h1>
        <div className="testimonial-block">
          <blockquote>
            <RichText.Content value={testiMonialText} />
          </blockquote>
          <div className="testimonial-info">
            <img src={testiMonialImage} />
            <RichText.Content value={testiMonialImage} />
            <p>
              <RichText.Content value={testiMonialAuthor} />
            </p>
          </div>
        </div>
      </>
    );
  },
});
