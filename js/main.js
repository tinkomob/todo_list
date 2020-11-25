if (JSON.parse(localStorage.getItem("main_list")) == null) {
    localStorage.setItem("main_list", JSON.stringify([]));
}

var app = new Vue({
    el: '#app',
    data: {
        news: [],
        heads: '',
        name_item: '',
        name_set:'',
        name_item_set: '',
        index_flag: '',
        title_name: '',
        body_name: '',
        row_index: '',
        col_index: '',
        color_flag: '',
        search: '',
        border_color: 'yellow',
    },
    methods: {
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },          
        add(){
            if (this.heads!=''){
                let obj = JSON.parse(localStorage.getItem("main_list"));
                let color = this.getRandomColor();
                obj.push({name:this.heads,list:[],color:color});
                localStorage.setItem("main_list", JSON.stringify(obj));
                this.news = obj;
                // window.location.reload();
            }
            this.heads=''
        },
        add_item(index,name_item) {
            if (name_item!=''){
                var date = new Date();
                let obj = JSON.parse(localStorage.getItem("main_list"));
                obj[index].list.push({item:this.name_item,done:false,priority:false,date: 
                    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + date.getSeconds()});
                localStorage.setItem("main_list", JSON.stringify(obj));
                this.news = obj;
            }
        },
        check(row_index, col_index) {
            let obj = JSON.parse(localStorage.getItem("main_list"));
            obj[row_index].list[col_index].done = !obj[row_index].list[col_index].done;
            localStorage.setItem("main_list", JSON.stringify(obj));
            this.news = obj;
        },
        priority(row_index, col_index) {
            let obj = JSON.parse(localStorage.getItem("main_list"));
            obj[row_index].list[col_index].priority = !obj[row_index].list[col_index].priority;
            localStorage.setItem("main_list", JSON.stringify(obj));
            this.news = obj;
        },
        del(index){
            let obj = JSON.parse(localStorage.getItem("main_list"));
            obj.splice(index, 1);
            localStorage.setItem("main_list", JSON.stringify(obj));
            this.news = obj;
        },
        del_item(index,q_index) {
            let obj = JSON.parse(localStorage.getItem("main_list"));
            obj[index].list.splice(q_index,1);
            localStorage.setItem("main_list", JSON.stringify(obj));
            this.news = obj;
        },
        name_setting(index,name_set) {
            if (name_set!=''){
                let obj = JSON.parse(localStorage.getItem("main_list"));
                obj[index].name = name_set;
                localStorage.setItem("main_list", JSON.stringify(obj));
                this.news = obj;
            }
            this.name_set=''
        },
        name_item_setting(row_index,col_index,name_item_set){
            if (name_item_set!='') {
                let obj = JSON.parse(localStorage.getItem("main_list"));
                obj[row_index].list[col_index].item = name_item_set;
                localStorage.setItem("main_list", JSON.stringify(obj));
                this.news = obj;
            }
            this.name_item_set=''
        },
        sort_by(method, row_index) {
            switch (method) {
                case "name": {
                    let obj = JSON.parse(localStorage.getItem("main_list"));
                    for (let i = 0; i < obj[row_index].list.length; i++) {
                        for (let j = 0; j < obj[row_index].list.length; j++) {
                            if (obj[row_index].list[i].item < obj[row_index].list[j].item) {
                                let temp = obj[row_index].list[i];
                                obj[row_index].list[i] = obj[row_index].list[j];
                                obj[row_index].list[j] = temp;
                            }
                        }
                    }
                    localStorage.setItem("main_list", JSON.stringify(obj));
                    this.news = obj;
                }
                break;
                case "date": {
                    let obj = JSON.parse(localStorage.getItem("main_list"));
                    for (let i = 0; i < obj[row_index].list.length; i++) {
                        for (let j = 0; j < obj[row_index].list.length; j++) {
                            if (obj[row_index].list[i].date < obj[row_index].list[j].date) {
                                let temp = obj[row_index].list[i];
                                obj[row_index].list[i] = obj[row_index].list[j];
                                obj[row_index].list[j] = temp;
                            }
                        }
                    }
                    localStorage.setItem("main_list", JSON.stringify(obj));
                    this.news = obj;
                }
            }
        },
    },
    computed: {
        todosByTitle() {
            let obj = JSON.parse(localStorage.getItem("main_list"));
            this.news = obj;
            return this.news.filter(rt => rt.name.indexOf(this.search) !== -1);
        },
    },
})
