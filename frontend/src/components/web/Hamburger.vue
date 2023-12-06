<template>
    <div v-if="type === 1" class="nav-burger" id="nav-icon1">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div v-if="type === 2" class="nav-burger" id="nav-icon2">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div v-if="type === 3" class="nav-burger" id="nav-icon3">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div v-if="type === 4" class="nav-burger" id="nav-icon4">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export const HamburgerType = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
};

export default {
    name: 'Hamburger',
    data() {
        document.addEventListener('toggleNav', () => {
            $('.nav-burger').toggleClass('open');
        });
    },
    props: {
        type: HamburgerType,
    },
};
</script>

<style scoped>
body {
    background-color: black;
}
a {
    color: black;
}
* {
    margin: 0;
    padding: 0;
}

/* Icon 1 */

#nav-icon1,
#nav-icon2,
#nav-icon3,
#nav-icon4 {
    width: 60px;
    height: 45px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
}

#nav-icon1 span,
#nav-icon3 span,
#nav-icon4 span {
    display: block;
    position: absolute;
    width: 100%;
    background: white;
    border: 3px solid white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
    top: 0px;
}

#nav-icon1 span:nth-child(2) {
    top: 18px;
}

#nav-icon1 span:nth-child(3) {
    top: 36px;
}

#nav-icon1.open span:nth-child(1) {
    top: 18px;
    -webkit-transform: rotate(135deg);
    -moz-transform: rotate(135deg);
    -o-transform: rotate(135deg);
    transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
    opacity: 0;
    left: -60px;
}

#nav-icon1.open span:nth-child(3) {
    top: 18px;
    -webkit-transform: rotate(-135deg);
    -moz-transform: rotate(-135deg);
    -o-transform: rotate(-135deg);
    transform: rotate(-135deg);
}

/* Icon 2 */

#nav-icon2 {
}

#nav-icon2 span {
    display: block;
    position: absolute;
    height: 9px;
    width: 50%;
    background: #d3531a;
    opacity: 1;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
}

#nav-icon2 span:nth-child(even) {
    left: 50%;
    border-radius: 0 9px 9px 0;
}

#nav-icon2 span:nth-child(odd) {
    left: 0px;
    border-radius: 9px 0 0 9px;
}

#nav-icon2 span:nth-child(1),
#nav-icon2 span:nth-child(2) {
    top: 0px;
}

#nav-icon2 span:nth-child(3),
#nav-icon2 span:nth-child(4) {
    top: 18px;
}

#nav-icon2 span:nth-child(5),
#nav-icon2 span:nth-child(6) {
    top: 36px;
}

#nav-icon2.open span:nth-child(1),
#nav-icon2.open span:nth-child(6) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

#nav-icon2.open span:nth-child(2),
#nav-icon2.open span:nth-child(5) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

#nav-icon2.open span:nth-child(1) {
    left: 5px;
    top: 7px;
}

#nav-icon2.open span:nth-child(2) {
    left: calc(50% - 5px);
    top: 7px;
}

#nav-icon2.open span:nth-child(3) {
    left: -50%;
    opacity: 0;
}

#nav-icon2.open span:nth-child(4) {
    left: 100%;
    opacity: 0;
}

#nav-icon2.open span:nth-child(5) {
    left: 5px;
    top: 29px;
}

#nav-icon2.open span:nth-child(6) {
    left: calc(50% - 5px);
    top: 29px;
}

/* Icon 3 */

#nav-icon3 span:nth-child(1) {
    top: 0px;
}

#nav-icon3 span:nth-child(2),
#nav-icon3 span:nth-child(3) {
    top: 18px;
}

#nav-icon3 span:nth-child(4) {
    top: 36px;
}

#nav-icon3.open span:nth-child(1) {
    top: 18px;
    width: 0%;
    left: 50%;
}

#nav-icon3.open span:nth-child(2) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

#nav-icon3.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

#nav-icon3.open span:nth-child(4) {
    top: 18px;
    width: 0%;
    left: 50%;
}

/* Icon 4 */

#nav-icon4 {
}

#nav-icon4 span:nth-child(1) {
    top: 0px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
}

#nav-icon4 span:nth-child(2) {
    top: 18px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
}

#nav-icon4 span:nth-child(3) {
    top: 36px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
}

#nav-icon4.open span:nth-child(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -3px;
    left: 8px;
}

#nav-icon4.open span:nth-child(2) {
    width: 0%;
    opacity: 0;
}

#nav-icon4.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    top: 39px;
    left: 8px;
}
</style>
