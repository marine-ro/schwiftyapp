<template>
    <div :class="classObject">
        <slot/>
    </div>

</template>
<script>
    const BTNS_DIRECTION = {
        horizontal: 'btns--horizontal',
        vertical: 'btns--vertical',
    };
    export default {
        name: 'ui-buttons-group',
        props: {
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) !== -1;
                },
            },
        },

        computed: {
            classObject() {
                return [
                    'btns',
                    BTNS_DIRECTION[this.direction],
                ];
            },
        },

    };
</script>
