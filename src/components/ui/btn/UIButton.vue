<template>
    <button
        :type="type"
        :class="classObject"
        @click="btnClick"
    >
        <span v-if="icon" class="btn__icon btn__prepend">
            <slot name="btn-icon"></slot>
        </span>
        <span class="btn__text">
            <slot name="btn-text"></slot>
        </span>
    </button>
</template>
<script>
    const BTN_VARIANTS = {
        default: 'btn--default',
        accent: 'btn--accent',
        success: 'btn--success',
        warning: 'btn--warning',
        danger: 'btn--danger',
        basic: 'btn--basic',
    };
    export default {
        name: 'ui-button',
        props: {
            active: {type: Boolean, default: false},
            disabled: {type: Boolean, default: false},
            icon: {type: Boolean, default: false},
            type: {
                type: String,
                default: 'button',
                validator(value) {
                    return ['button', 'submit', 'reset'].indexOf(value) !== -1;
                },
            },
            kind: {
                type: String,
                default: 'default',
                validator(value) {
                    return ['default', 'accent', 'success', 'warning', 'danger', 'basic'].indexOf(value) !== -1;
                },
            },
        },

        computed: {
            classObject() {
                return [
                    'btn',
                    BTN_VARIANTS[this.kind],
                    {active: this.active},
                    {disabled: this.disabled},
                ];
            },
        },

        methods: {
            btnClick(evt) {
                this.$emit('click', evt);
            },
        },

    };
</script>
<style lang="scss" scoped>
.btn {
    display: inline-block;
    margin: 0.5em 0;
    padding: 1em 2em;
    border-radius: 3px;
    font-family: sans-serif;
    font-size: 1em;
    font-weight: 600;
    letter-spacing: 0.02em;
    line-height: 1.2;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
    border-width: 1px;
    border-style: solid;
    transition: 0.5s;

    &--default {
        color: rgba(0,0,0,.6);
        background: #e0e1e2;
        border-color: #e0e1e2;
    }
    &--basic {
        color: white;
        background-color: transparent;
        box-shadow: inset 0 0 0 1px rgb(250 250 250 / 10%);
        border-color: transparent;
    }
    &--accent {
        color: rgba(0,0,0,.6);
        background: #e06020;
        border-color: #e06020;
    }
    &:hover {
    transform: translateY(-5px);
    transition: 0.5s;
}
}
</style>
