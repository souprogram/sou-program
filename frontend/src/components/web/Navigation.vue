<template>
    <div>
        <nav id="nav" class="d-flex justify-content-between">
            <a class="inline-block" href="/">
                <img
                    id="logo"
                    :class="(navOpened ? 'opened' : '') + ' m-2'"
                    src="@/assets/sp-icon.png"
                    alt=""
                />
            </a>
            <div class="d-flex align-items-center">
                <div @click="navToggle" class="pl-5 menu-icon cursor-pointer">
                    <Hamburger :type="1" class="float-end p-4" />
                </div>
            </div>
        </nav>
        <div :class="navOpened ? 'opened' : ''" id="nav-content">
            <div class="d-flex h-100 flex-column justify-content-between">
                <span></span>
                <ul class="navbar-nav container">
                    <li
                        v-for="route in routes"
                        :key="route.path"
                        class="nav-item"
                    >
                        <a :href="route.path" class="nav-link">
                            <div class="route-label">
                                {{ route.label }}
                            </div>
                        </a>
                    </li>
                </ul>
                <SouFooter />
            </div>
        </div>
    </div>
</template>

<script>
import SouFooter from '@/components/web/SouFooter.vue';
import Hamburger from './Hamburger.vue';

let nav, body, content, scrollThreshold, timeout, logo, menuIcon;

function toggleScroll() {
    if (document.body.style.overflow === 'hidden') {
        document.body.style.overflow = 'initial';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

const scrolledDown = () => {
    // When scrolled down
    nav.style.transition = 'transform 0s';
    nav.style.transform = 'translateY(-100%)';

    nav.classList.add('fixed');
    const mtop = nav.offsetHeight;
    content.style.marginTop = `${mtop}px`;

    nav.style.transition = 'transform 0.3s ease-out';
    nav.style.transform = 'translateY(0%)';
};
const scrolledUp = () => {
    // When on top
    nav.classList.remove('fixed');
    content.style.marginTop = 0;

    nav.style.transition = 'transform 0s';
    nav.style.transform = 'translateY(100%)';

    setTimeout(() => {
        nav.style.transition =
            'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1.11)';
        nav.style.transform = 'translateY(0)';
    }, 10);
};

function toggleNavOnScroll() {
    if (window.scrollY >= scrollThreshold && !nav.classList.contains('fixed')) {
        scrolledDown();
    } else if (
        window.scrollY < scrollThreshold &&
        nav.classList.contains('fixed')
    ) {
        scrolledUp();
    }
}

const throttleTime = 10;
window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        toggleNavOnScroll();
    }, throttleTime);
});

document.addEventListener('keypress', function (event) {
    if (event.key === 'h') {
        nav.toggleAttribute('hidden');
    }
    if (event.key === 'b') {
        body.classList.toggle('debugger-border');
    }
});

export default {
    data() {
        const routes = [
            { path: '/', label: 'Početna' },
            { path: '/educators', label: 'Šou lab' },
            { path: '/podcast', label: 'Šou podkast' },
            { path: '/contact', label: 'Kontakt' },
            // { path: "/login", label: "Prijava" },
        ];
        return {
            routes,
            navOpened: false,
        };
    },
    components: {
        Hamburger,
        SouFooter,
    },
    mounted() {
        nav = document.getElementById('nav');
        body = document.getElementsByTagName('body')[0];
        content = document.getElementById('web-container');
        logo = document.getElementById('logo');
        menuIcon = document.getElementsByClassName('menu-icon')[0];
        scrollThreshold = nav.offsetHeight;
    },
    methods: {
        navToggle() {
            toggleScroll();
            this.navOpened = !this.navOpened;
            document.dispatchEvent(new Event('toggleNav'));
        },
    },
    name: 'educatorCalendar',
};
</script>

<style lang="scss" scoped>
body {
    background-color: black;
}

nav.fixed {
    position: fixed;
    left: 0;
    right: 0;
}

.menu-icon {
    scale: 0.6;
}

nav {
    position: relative;
    z-index: 2;
    transition: padding-top 1s;
    transition: padding-bottom 1s;
    padding: 0.2em;
    background-color: var(--web-primary-color);

    #logo {
        height: 58px;
        width: 58px;
        box-shadow: inset 0px 0px 0px 5px white;
        border: 3px solid white;
        border-radius: 50%;
        transition: scale 0.3s;
    }

    #logo.opened {
        animation: rotate 1s ease-in-out;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(180deg);
        }
    }

    .position-absolute {
        right: 1em;
        top: 0.5em;
    }

    .menu-icon {
        z-index: 5;
        font-size: 64px;
        height: auto;
        cursor: pointer;
    }

    .close-nav {
        display: flex;
        align-items: flex-start;
        font-size: 64px;
        cursor: pointer;
    }
}

#nav-content {
    position: fixed;
    top: 100%;
    left: 0;
    background-color: var(--web-primary-color);
    color: white;
    transition: top 0.5s;
    height: 100vh;
    width: 100%;
    padding: 0em 1em;
    z-index: 1;

    li {
        font-size: 24px;
        padding: 0.1em;

        a {
            width: 100%;
            display: inline-block;
            font-size: 30px;
            border-bottom: 2px solid white;
            margin-top: 1em;
        }

        a:hover {
            .route-label::after {
                left: 0;
            }
        }
    }
}

#nav-content.opened {
    top: 0;
}

@media (max-width: 768px) {
    #nav-content {
        li {
            a {
                font-size: 26px;
            }
        }
    }

    nav {
        padding: 0.1em;
        #logo {
            height: 40px;
            width: 40px;
            border: 2px solid white;
        }

        .menu-icon {
            scale: 0.45;
        }
    }
}
</style>
