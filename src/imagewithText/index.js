const { registerBlockType } = wp.blocks;
const {
  RichText,
  MediaUpload,
  AlignmentToolbar,
  BlockControls,
} = wp.blockEditor;
const { Button, IconButton } = wp.components;
import { ReactComponent as Logo } from "../logo.svg";

registerBlockType("mtgtab/image-with-text", {
  title: "Image with Text",
  category: "mt-blocks",
  icon: { src: Logo },

  supports: {
    align: ["wide", "full"],
  },
  edit: (props) => {
    return (
      <>
        <div className="image-text-block">
          <div className="container">
            <div className="content">
              <h1>Download our App!</h1>
              <p>
                Morbi eget iaculis tellus. Vestibulum eu leo odio. Pellentesque
                lacus magna, suscipit sed semper sed, tempor vitae nisi. Vivamus
                venenatis, lacus in ultricies pharetra, odio mi sagittis ipsum,
                ac maximus turpis mi eu mauris. Proin sed urna sed nisi
                ultricies maximus vitae vitae felis. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. In molestie est eget imperdiet ornare. Aliquam erat
                volutpat. Vestibulum a condimentum sem.{" "}
              </p>
              <a href="#" className="button">
                Download
              </a>
            </div>

            <div className="image">
              <img src="img/app.png" />
            </div>
          </div>
        </div>
      </>
    );
  },
  save: (props) => {
    return (
      <>
        <div className="image-text-block">
          <div className="container">
            <div className="content">
              <h1>Download our App!</h1>
              <p>
                Morbi eget iaculis tellus. Vestibulum eu leo odio. Pellentesque
                lacus magna, suscipit sed semper sed, tempor vitae nisi. Vivamus
                venenatis, lacus in ultricies pharetra, odio mi sagittis ipsum,
                ac maximus turpis mi eu mauris. Proin sed urna sed nisi
                ultricies maximus vitae vitae felis. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. In molestie est eget imperdiet ornare. Aliquam erat
                volutpat. Vestibulum a condimentum sem.{" "}
              </p>
              <a href="#" className="button">
                Download
              </a>
            </div>

            <div className="image">
              <img src="img/app.png" />
            </div>
          </div>
        </div>
      </>
    );
  },
});
