import { createMachine } from "xstate";

const myMachine = createMachine({
    initial: "notHovered",
    states:{
        notHovered: {
            on: {
                HOVER: "hovered"
            }
        },

        hovered: {
            on: {
                UNHOVER: "notHovered"
            }
        }
    }
});

export default myMachine;