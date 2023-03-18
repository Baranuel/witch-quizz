import { TypeAnimation } from "react-type-animation";

export const AnimatedHeader = () => {
  return (
    <TypeAnimation
      sequence={[
        "Encounter",
        // Types 'Three' without deleting 'Two'
        () => {
          console.log("Done typing!"); // Place optional callbacks anywhere in the array
        },
      ]}
      speed={20}
      wrapper="h1"
      cursor={false}
      className="text-5xl font-k2d text-color-heading"
    />
  );
};
