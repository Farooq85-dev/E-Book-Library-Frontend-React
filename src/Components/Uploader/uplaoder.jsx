import { FileInput, Label } from "flowbite-react";
import { forwardRef } from "react";

const UploaderComp = forwardRef(({ ...props }, ref) => {
  return (
    <div>
      <div>
        <Label htmlFor="multiple-file-upload" />
      </div>
      <FileInput ref={ref} {...props} id="file-upload" />
    </div>
  );
});

export { UploaderComp };
