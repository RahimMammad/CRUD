const API = "http://localhost:3000/posts"

const dataTable=document.getElementById('data-table')

const axiosData = async () => {
    try {
        const respData = await axios.get(API)
        console.log(respData);
    } catch {
        console.log(error);
    }
}

const addTable = (data) => {
    dataTable.innerHTML=''
    data.forEach(item => {
        const row=document.createElement('tr')
        row.innerHTML=`
       
            <td>${item.id}</td>
            <td>${item.body}</td>
            <td>${item.title}</td>
            <td>
            <button onclick="postMethod(${item.id})">Edit</button>
            <button onclick="deletePost(${item.id})">Delete</button>
        </td>
        `
        dataTable.appendChild(row)
    });
}

const postMethod = async () => {
    const descInp = document.getElementById("desc-input");
    const titleInp = document.getElementById("name-input");
    try {
        await axios.post(API, {
            title: titleInp.value,
            body: descInp.value
        })
        axiosData()
    } catch (error) {
        console.log(error);
    }
}

let updatePostId = null

const updatePost = async (postId) => {
    try {
        const resp = await axios.get(`${API}/${postId}`)
        const post = resp.data

        descInp.value = post.description
        titleInp.value = post.name
        updatePostId = postId
    } catch (error) {
        console.log(error);
    }
}

const updateMethod = async () => {
    const descInp = document.getElementById("desc-input");
    const titleInp = document.getElementById("name-input");

    if(updatePostId) {
        try {
            await axios.put(`${API}/${updatePostId}`, {
                title: titleInp.value,
                body: descInp.value
            })
            axiosData()
        } catch (error) {
            console.log(error);
        }
    }
}

const deletePost = async (postId) => {
    try {
        await axios.delete(`${API}/${postId}`)
        axiosData()
    } catch (error) {
        console.log(error);
    }
}

axiosData()