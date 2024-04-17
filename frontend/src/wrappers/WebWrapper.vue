<template>
    <div id="web-wrapper" class="d-flex flex-column overflow-hidden">
        <!-- <div class="filler">&nbsp;</div> -->
        <div class="flex-grow-1">
            <!-- <Navigation /> -->
            <router-view id="web-container"></router-view>
        </div>
        <!-- <SouFooter class="flex-shrink-0" /> -->
    </div>
</template>

<script>
import Navigation from '@/components/web/Navigation.vue';
import SouFooter from '@/components/web/SouFooter.vue';

export default {
    name: 'WebWrapper',
    created() {
        const bodyStyles = window.getComputedStyle(document.body);
        if (
            bodyStyles.overflowX === 'scroll' ||
            bodyStyles.overflowX === 'visible'
        ) {
        }
    },
    components: {
        Navigation,
        SouFooter,
    },
};
</script>

<style lang="scss">
:root {
    --web-primary-color: black;
}
#web-wrapper {
    background-color: gray;
    min-height: 100dvh;
}

// .filler {
//     position: absolute;
//     height: 80px;
//     width: 100%;
//     background-color: var(--web-primary-color);
//     z-index: 1;
// }

// #web-container {
//     padding: 160px 8em;
//     text-align: left;
//     line-height: 20px;
//     font-weight: 100;

//     h1 {
//         font-size: 4rem;
//         padding: 0px 0px 53px 0px;
//     }

//     h2 {
//         font-size: 3rem;
//     }

//     h3 {
//         font-size: 2.5rem;
//     }

//     h4 {
//         font-size: 2rem;
//     }

//     h5 {
//         font-size: 1.5rem;
//     }

//     h6 {
//         font-size: 1.25rem;
//         margin-top: 2em;
//         font-weight: 100;
//     }

//     img {
//         width: 100%;
//     }

//     .text-muted {
//         font-size: 0.85em;
//     }
// }

// @media (max-width: 1200px) {
//     #web-container {
//         padding: 160px 4em;

//         h1 {
//             font-size: 3.5rem;
//         }
//     }
// }

// @media (max-width: 1024px) {
//     #web-container {
//         padding: 160px 2em;
//         font-size: 18px;
//         line-height: 22px;

//         h1 {
//             font-size: 3rem;
//         }

//         h2 {
//             font-size: 2.5rem;
//         }

//         h3 {
//             font-size: 2.25rem;
//         }

//         h4 {
//             font-size: 2rem;
//         }
//     }
// }

// @media (max-width: 768px) {
//     #web-container {
//         padding: 130px 2em;
//         line-height: 24px;
//         h1 {
//             padding: 0px 32px 32px 32px;
//         }
//     }

//     .mobile-justify {
//         text-align: justify;
//         text-justify: inter-word;
//     }

//     .filler {
//         height: 59px;
//     }
// }

// @media (max-width: 480px) {
//     #web-container {
//         padding: 64px 1em;

//         h1 {
//             font-size: 2.5rem;
//             padding: 0px 0px 15px 0px;
//         }

//         h2 {
//             font-size: 2.25rem;
//         }

//         h3 {
//             font-size: 2rem;
//         }

//         h4 {
//             font-size: 1.66rem;
//         }
//         h6 {
//             margin-top: 0.5em;
//         }
//     }
// }

/* Colors * /
@media (max-width: 1200px) {
    #web-container {
        background-color: yellow;
    }
}

@media (max-width: 1024px) {
    #web-container {
        background-color: orange;
    }
}

@media (max-width: 768px) {
    #web-container {
        background-color: red;
    }
}

@media (max-width: 480px) {
    #web-container {
        background-color: darkred;
    }
}*/
</style>
