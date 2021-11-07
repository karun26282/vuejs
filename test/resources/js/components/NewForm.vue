<template>
    <div>
        <form method="post" @submit.prevent="onSubmit" @keydown="errors.clear($event.target.name)">

            <div class="form-control">

                <label for="name" class="label">Title</label>
                <input type="text" class="form-control"  v-model="title">
                <span class="is-danger" v-if="errors.has('title')" v-text="errors.get('title')"></span>

            </div>
            <div class="form-control">

                <label for="name" class="label">Body</label>
                <input type="text" class="form-control"  v-model="form.body">
                <span class="is-danger" v-if="errors.has('body')" v-text="errors.get('body')"></span>
            </div>

            <div class="form-control">
                <button class="btn btn-primary" :disabled="errors.any()">Create</button>
            </div>

        </form>
    </div>
</template>

<script>

export default{
    data() {
        return {
            form: new Form({
                title : '',
                body : ''
            }),
        }
    },

    methods:
    {
        onSubmit()
        {
            this.form.submit('POST', '/article');
        }
    }
}

</script>

