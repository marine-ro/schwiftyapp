<template>
    <span class="status__icon" :class="classIcon"></span>
</template>

<script>

    export default {
        name: 'CharacterStatusIcon',

        props: {
            status: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
                statuses: {
                    isActive: 'Alive',
                    notIsActive: 'Dead',
                    unknown: 'unknown',
                },
            };
        },

        computed: {
            classIcon() {
                return Object.keys(this.statuses).find(key => this.statuses[key] === this.status);
            },
        },
    };
</script>

<style scoped lang="scss">
    .status__icon {
        height: 0.5rem;
        width: 0.5rem;
        margin-right: 0.375rem;
        border-radius: 50%;
        display: inline-block;
        &.isActive {
            background: rgb(85, 204, 68);
        }
        &.notIsActive {
            background: rgb(214, 61, 46);
        }
        &.unknown {
            background: rgb(158, 158, 158);
        }

    }
</style>
