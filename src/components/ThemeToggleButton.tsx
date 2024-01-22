import {
  Index,
  type Component,
  createEffect,
  Show,
  createSignal,
  createRenderEffect,
} from "solid-js";

const ThemeToggleButton: Component<{}> = (props) => {
  const rootEl =
    typeof document !== "undefined" ? document.documentElement : null;
  const themes = ["light", "dark"];

  const test = () => {
    if (rootEl?.classList.contains("dark")) {
      return "dark";
    } else if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("theme")
    ) {
      return localStorage.getItem("theme") ?? "light";
    } else if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }
  };
  const [theme, setTheme] = createSignal<"light" | "dark">(test());

  createEffect(() => {
    if (rootEl && theme() === "light") {
      document.body.classList.add("colorTransition");
      rootEl.classList.remove("dark");
      setTimeout(() => {
        document.body.classList.remove("colorTransition");
      }, 1000);
    } else if (rootEl && theme() === "dark") {
      document.body.classList.add("colorTransition");
      rootEl.classList.add("dark");
      setTimeout(() => {
        document.body.classList.remove("colorTransition");
      }, 1000);
    }
  });

  return (
    <div class="flex items-center justify-center">
      <Show
        when={theme() === "dark"}
        fallback={
          <button
            onClick={() => {
              setTheme("dark");
              localStorage.setItem("theme", theme());
            }}
          >
            <svg
              class="fill-black"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        }
      >
        <button
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", theme());
          }}
        >
          <svg
            class="fill-black"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </Show>
    </div>
  );
};

export default ThemeToggleButton;
