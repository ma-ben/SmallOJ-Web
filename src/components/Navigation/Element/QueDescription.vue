<template>
    <h1 style="color: white;">
        Question{{ itemID  }}
    </h1>
    <div v-html="markdownToHtml"></div>
    
</template>

<script>
import hljs from 'highlight.js';
import {markedHighlight} from "marked-highlight";
import {Marked} from "marked";

export default {
     computed: {
        markdownToHtml() {
            const marked = new Marked(
                markedHighlight({
                    langPrefix: 'hljs language-',
                    highlight(code, lang) {
                        const language = hljs.getLanguage(lang)?lang:"plaintext";
                        return hljs.highlight(code, {language}).value;
                    }
                })
            )
            return marked.parse(this.description);
        },
        
    },
    data() {
        return {
            itemID: 0,
            description: '+ 00',
        };
    },
    created() {
        // 在这里添加获取数据的逻辑
        const itemIDCookie = this.getCookie('itemID');
        if (itemIDCookie) {
            this.itemID = parseInt(itemIDCookie); // 将字符串转换为整数
        }
        else this.itemID = 0;

        this.$api.get('/api/problem/'+this.itemID+'/md')
            .then(response => {
                this.description = response.data.md;
            })
            .catch(error => {
                console.error(error);
            });
    },
    
    methods: {
        getCookie(name) {
            const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith(name + '='))
                ?.split('=')[1];
            return cookieValue || null;
        },
    },
};
</script>
