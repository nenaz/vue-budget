<template>
  <page-body-content>
    <div>
      <svg width="100%" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="MyGradient">
            <stop offset="0%" stop-color="#DEDEDE" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-2; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop offset="50%" stop-color="#F6F6F6" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-1.5; 1.5"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop offset="100%" stop-color="#DEDEDE" stop-opacity="1">
              <animate
                attributeName="offset"
                values="-1; 2"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
          </linearGradient>
        </defs>
        <rect fill="url(#MyGradient)" x="0" y="5" rx="3" ry="3" width="70%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="30" rx="3" ry="3" width="100%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="55" rx="3" ry="3" width="55%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="113" rx="3" ry="3" width="100%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="144" rx="3" ry="3" width="100%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="175" rx="3" ry="3" width="100%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="208" rx="3" ry="3" width="100%" height="16"></rect>
        <rect fill="url(#MyGradient)" x="0" y="239" rx="3" ry="3" width="100%" height="16"></rect>
      </svg>
    </div>
  </page-body-content>
</template>

<script>
import PageBodyContent from '@/components/PageBodyContent';

export default {
  name: 'OfferPlaceholder',
  components: {
    PageBodyContent,
  },
};
</script>
