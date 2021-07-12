const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload,InspectorControls, ColorPalette} = wp.blockEditor;
const { Button, IconButton,PanelBody,TextControl,TabPanel } = wp.components;
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
      attribute: "src",
      selector: ".testimonial-info img",
    },
    testiMonialTextColor: {
      type: "string",
    },
    testiMonialAuthorColor: {
      type: "string",
    },
    testiMonialBorderColor: {
      type: "string",
    },
  },
  icon: { src: Logo },

  edit: (props) => {
    //extract attributes value
    const {
      attributes: {
        testiMonialTitle,
        testiMonialText,
        testiMonialAuthor,
        testiMonialImage,
        testiMonialTextColor,
        testiMonialAuthorColor,
        testiMonialBorderColor
      },
      setAttributes,
    } = props;
    //Set attribute testimonial text
    const editTestionalText = (newTesti) => {
      setAttributes({ testiMonialText: newTesti });
    };

    //set attribute testimonial image
    const onSelectImage = (media) => {
      setAttributes({ testiMonialImage: media.sizes.medium.url });
    };
    return (
      <>
      <InspectorControls>
        <PanelBody>
          <p> Change Border color </p>
          <ColorPalette onChange={ newColor=>setAttributes({testiMonialBorderColor: newColor})}/>

          <p> Change text color </p>
          <ColorPalette onChange={ newColor=>setAttributes({testiMonialTextColor: newColor})}/>
          <p> Change Author Color </p>
          <ColorPalette onChange={ newColor=>setAttributes({testiMonialAuthorColor: newColor})}/>
        </PanelBody>
      </InspectorControls>
        <div className="testimonial-block" style={{ borderTop:`3px solid ${testiMonialBorderColor}`}}>
          <blockquote>
            <RichText
              placeholder="Add testimonial text"
              onChange={editTestionalText}
              value={testiMonialText}
              style={{color: testiMonialTextColor }}
            />
          </blockquote>
          <div className="testimonial-info">
            <img src={testiMonialImage} />
            <MediaUpload
              onSelect={onSelectImage}
              type="image"
              //value={testiMonialImage}
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
                placeholder="Add Author Name"
                value={testiMonialAuthor}
                onChange={(testiAuthor) =>
                  setAttributes({ testiMonialAuthor: testiAuthor })
                }
                style={{color:testiMonialAuthorColor }}
              />
            </p>
          </div>
        </div>
      </>
    );
  },
  save: (props) => {
    const {
      attributes: {
        testiMonialTitle,
        testiMonialText,
        testiMonialAuthor,
        testiMonialImage,
        testiMonialTextColor,
        testiMonialAuthorColor,
        testiMonialBorderColor
      },
    } = props;
    return (
      <>

        <div className="testimonial-block" style={{ borderTop:`3px solid ${testiMonialBorderColor}`}}>
          <blockquote style={{color: testiMonialTextColor }}>
            <RichText.Content value={testiMonialText} />
          </blockquote>
          <div className="testimonial-info">
            <img src={testiMonialImage} />
            <p style={{color:testiMonialAuthorColor }}>
              <RichText.Content value={testiMonialAuthor} />
            </p>
          </div>
        </div>
      </>
    );
  },
});
