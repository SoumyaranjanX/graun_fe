const usePreferDarkMode = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export default usePreferDarkMode;
