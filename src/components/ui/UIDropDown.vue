<template>
    <div class='btn-group'>
        <li @click='toggleMenu()' class='dropdown-toggle'>
            {{ selectedOption.name.toLowerCase() }}
        </li>

        <ul class='dropdown-menu' v-if='showMenu'>
            <li v-for='option in options' :key='option.id'>
                <a href='javascript:void(0)' @click='updateOption(option)'>
                    {{ option.name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectedOption: {
                    name: '',
                },
                showMenu: false,
            };
        },
        props: {
            options: {
                type: [Array, Object],
            },
            selected: {},
            placeholder: [String],
        },
        mounted() {
            this.selectedOption = this.selected;
        },
        methods: {
            updateOption(option) {
                this.selectedOption = option;
                this.showMenu = false;
                this.$emit('updateOption', this.selectedOption);
            },
            toggleMenu() {
                this.showMenu = !this.showMenu;
            },
        },
    };
</script>
