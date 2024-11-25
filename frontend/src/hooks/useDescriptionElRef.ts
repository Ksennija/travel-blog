import DOMPurify from "dompurify";
import { marked } from "marked";
import { useRef, useEffect } from "react";

// useRef helps to make text markup for country description
// before rendering I parse the text with the marked and sanitize the output HTML,
// following the instructions in the documentation
// https://marked.js.org/

export const useDescriptionElRef = (description: string) => {
  const descriptionElRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionElRef.current) {
      descriptionElRef.current.innerHTML = DOMPurify.sanitize(
        marked.parse(description) as string
      );
    }
  }, [description]);

  return { descriptionElRef };
};
