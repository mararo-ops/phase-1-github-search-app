document.addEventListener('DOMContentLoaded', () => {
    const myform = document.querySelector('#github-form');
    const input = document.querySelector('#search');
    const userlist = document.querySelector('#user-list')

  
    myform.addEventListener('submit', (event) => {
      event.preventDefault();
      const searchItem = input.value;
      searchGitHub(searchItem);
    });
    
    userlist.addEventListener('click', (e) => {
    const gituser = e.target.textContent;
    gitsearch(gituser)        
    })

  
    function searchGitHub(searchItem) {
      fetch(`https://api.github.com/search/users?q=${searchItem}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
         searchdisplay(data.items);
        });
    }

    function gitsearch(gituser)  {
      fetch(`https://api.github.com/users/${gituser}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
        explorerepo(data);
        })
        .catch(error => {
            console.error('Error:', error);
          });
    }

    function searchdisplay(users) {
        const userlist = document.querySelector('#user-list')
        
    users.forEach(user => {
     const detail = document.createElement('li') 
    detail.textContent = user.login;
    let img=document.createElement('img')  
    img.src=user.avatar_url

    let link=document.createElement('a')
    link.href= user.html_url;
    link.textContent = 'View Profile';
    userlist.append(img);
    userlist.append(link)     
    userlist.append(detail);
})
    }
    function explorerepo(data) {
        const repos = data; 
        const repolist = document.getElementById("repos-list");
        repolist.innerHTML = ''; 
      
        repos.forEach(repo => {
          const lines = document.createElement('li');
          lines.textContent = repo.name;

    

          repolist.append(lines);
            });
      }
});