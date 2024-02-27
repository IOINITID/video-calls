import { css } from '@linaria/core';

export const globalStyles = () => css`
  /* stylelint-disable-next-line selector-pseudo-class-no-unknown */
  :global() {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }

    html {
      box-sizing: border-box;
    }

    html,
    body,
    #root {
      height: 100%;
    }

    body {
      margin: 0;
      background: radial-gradient(
        105.05% 99.28% at 50% 29.72%,
        #8c9eff 0%,
        #536dfe 42.9%,
        #536dfe 61.7%,
        #3d5afe 84.71%,
        #304ffe 100%
      );
      background-repeat: no-repeat;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      box-shadow: 0 0 0 30px #ffffff inset;
    }
  }
`;
