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
    const BTN_SIZE = {
        normal: 'btn--normal',
        small: 'btn--small',
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
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return ['normal', 'small'].indexOf(value) !== -1;
                },
            },
        },

        computed: {
            classObject() {
                return [
                    'btn',
                    BTN_VARIANTS[this.kind],
                    BTN_SIZE[this.size],
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
