const ScrollToElement = (id: string) => {
  if (typeof window !== "undefined") {
    const element = document.querySelector(id);
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
};
export default ScrollToElement;
