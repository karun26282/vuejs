<template>
    <div>
        <h2>Articles</h2>
        <form @submit.prevent="addArticle" class="mb-4">
            <div class="form-group">
                <input type="text" class="form-control mb-2" placeholder="title" v-model="article.title">
            </div>
            <div class="form-group">
                <textarea class="form-control mb-2" placeholder="body" v-model="article.body"></textarea>
            </div>
            <div class="d-grid">
                <button type="submit" class="btn btn-info">Save</button>
            </div>
        </form>
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li :class="[{disabled : !pagination.prev_page_url}]" class="page-item">
                    <a class="page-link" href="javascript:void(0);" @click="fetchArticals(pagination.prev_page_url)">Previous</a>
                </li>

                <li class="page-item" v-for="pages in pagination.all_page" :key="pages.label">
                    <p v-if="pages.label != 'Previous' && pages.label != 'Next'">
                        <a href="javascript:void(0);" class="page-link" @click="fetchArticals(pages.url)"> {{ pages.label }} </a>
                    </p>
                </li>

                <li class="page-item disabled">
                    <a href="javascript:void(0);" class="page-link text-dark">Page {{ pagination.current_page }} of {{ pagination.last_page }} </a>
                </li>

                <li :class="[{disabled : !pagination.next_page_url}]" class="page-item">
                    <a class="page-link" href="javascript:void(0);" @click="fetchArticals(pagination.next_page_url)">Next</a>
                </li>
            </ul>
        </nav>
        <div class="card card-body mb-3" v-for="article in articles" v-bind:key="article.id">

            <h3> {{ article.title }} </h3>
            <p> {{ article.body }} </p>
            <button @click="editArticle(article)" class="btn btn-warning mb-2">Edit</button>
            <button @click="deleteArticle(article.id)" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
            article: {
                id : '',
                title : '',
                body : ''
            },
            article_id : '',
            pagination : {},
            edit : false
        }
    },

    created() {
        this.fetchArticals();
    },

    methods: {
        fetchArticals(page_url) {
            let vm = this;
            page_url = page_url || 'api/articles'
            fetch(page_url)
                .then(res => res.json())
                .then(res => {
                    this.articles = res.data;
                    vm.makePagination(res.meta, res.links);
                })
                .catch(err => console.log(err));
        },
        makePagination(meta, links){
            let pagination = {
                current_page : meta.current_page,
                last_page : meta.last_page,
                all_page : meta.links,
                next_page_url : links.next,
                prev_page_url : links.prev
            };

            this.pagination = pagination;
        },

        deleteArticle(id){
            if(confirm("Are you sure")){
                fetch(`api/article/${id}`, {
                    method: "Delete"
                })
                .then(res => res.json())
                .then(data => {
                    alert("Article Deleted");
                    this.fetchArticals();
                })
            }
        },

        addArticle(){
            if(this.edit === false){
                //Add
                fetch('api/article', {
                    method: "post",
                    body: JSON.stringify(this.article),
                    headers:{
                        'content-type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.article.title = '';
                    this.article.body = '';
                    alert("Article Save");
                    this.fetchArticals();
                })
                .catch(err => console.log(err));
            }else{
                fetch('api/article', {
                    method: "put",
                    body: JSON.stringify(this.article),
                    headers:{
                        'content-type' : 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.article.title = '';
                    this.article.body = '';
                    alert("Article Updated");
                    this.fetchArticals();
                })
                .catch(err => console.log(err));
            }
        },

        editArticle(article){
            this.edit = true;
            this.article.id = article.id;
            this.article_id = article.id;
            this.article.title = article.title;
            this.article.body = article.body;
        }

    }
}
</script>
