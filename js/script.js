{  'use strict';
   const titleClickHandler = function(event){  
      event.preventDefault();  
      const clickedElement = this;
      /* [DONE] remove class 'active' from all article links */
      const activeLinks = document.querySelectorAll('.titles a.active');
      for(let activeLink of activeLinks){
         activeLink.classList.remove('active');
      }
      /* [DONE] add class 'active' to the clicked link */
      clickedElement.classList.add('active');
      /* [DONE] remove class 'active' from all articles */
      const activeArticles = document.querySelectorAll('.posts article.active');
      for(let activeArticle of activeArticles){
         activeArticle.classList.remove('active');
      }
      /* [DONE] get 'href' attribute from the clicked link */
      const clickedHref = clickedElement.getAttribute('href');
      /* find the correct article using the selector (value of 'href'attribute) */
      const articleToActive = document.querySelector(clickedHref);
      /* add class 'active' to the correct article */
      articleToActive.classList.add('active');
   };

   const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorsSelector = '.post-author',
      optTagsListSelector = '.tags.list';

   // eslint-disable-next-line no-inner-declarations
   function generateTitleLinks(customSelector = '') {
      /* remove contents of titleList */
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML = '';
      /* for each article */
      const articles= document.querySelectorAll(optArticleSelector + customSelector);
      let html = '';
      for(let article of articles){
      /* get the article id */
         const articleId= article.getAttribute('id');
         /* find the title element */
         /* get the title from the title element */
         const articleTitle = article.querySelector(optTitleSelector).innerHTML;
         /* create HTML of the link */
         const linkHTML = '<li><a href="#'+articleId+'"><span>'+ articleTitle+'</span></a></li>';
         /* insert link into titleList */
         html = html + linkHTML; 
      }
      titleList.innerHTML = html;
      const links = document.querySelectorAll('.titles a');
      for(let link of links){
         link.addEventListener('click', titleClickHandler);
      }
   }

   generateTitleLinks();

   // eslint-disable-next-line no-inner-declarations
   function generateTags(){
      /* [NEW] create a new variable allTags with an empty array */
      let allTags = [];
      /* find all articles */
      const articles= document.querySelectorAll(optArticleSelector);
      /* START LOOP: for every article: */
      for(let article of articles){
      /* find tags wrapper */
         const articleTagList = article.querySelector(optArticleTagsSelector);
         /* make html variable with empty string */
         let html = '';
         /* get tags from data-tags attribute */
         const articleTags = article.getAttribute('data-tags');
         /* split tags into array */
         const articleTagsArray = articleTags.split(' ');
         /* START LOOP: for each tag */
         for(let tag of articleTagsArray){
            /* generate HTML of the link */
            /* add generated code to html variable */
            const linkHTML = '<li><a href="#tag-'+tag+'"><span>'+tag+'</span></a></li>';
            html=html + linkHTML;
            if(allTags.indexOf(linkHTML) == -1){
            /* [NEW] add generated code to allTags array */
               allTags.push(linkHTML);
            }
            /* END LOOP: for each tag */
         }
         console.log(allTags);
         /* insert HTML of all the links into the tags wrapper */
         articleTagList.innerHTML = html;
         /* END LOOP: for every article: */
      }
      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector(optTagsListSelector);
      /* [NEW] add html from allTags to tagList */
      tagList.innerHTML = allTags.join(' ');
      console.log(tagList);
   }

   generateTags();

   // eslint-disable-next-line no-inner-declarations
   function tagClickHandler(event){
      /* prevent default action for this event */
      event.preventDefault();
      /* make new constant named "clickedElement" and give it the value of "this" */
      const clickedElement = this;
      /* make a new constant "href" and read the attribute "href" of the clicked element */
      const href = clickedElement.getAttribute('href');
      /* make a new constant "tag" and extract tag from the "href" constant */
      const tag = href.replace('#tag-', '');
      console.log (tag);
      /* find all tag links with class active */
      const activeTags = document.querySelectorAll('a.active');
      /* START LOOP: for each active tag link */
      for(let activeTag of activeTags){
         /* remove class active */
         activeTag.classList.remove('active');
         /* END LOOP: for each active tag link */
      }
      /* find all tag links with "href" attribute equal to the "href" constant */
      const tags = document.querySelectorAll('a[href="' + href + '"]');
      /* START LOOP: for each found tag link */
      for(let tag of tags){
         /* add class active */
         tag.classList.add('active');
         /* END LOOP: for each found tag link */
      }
      /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-tags~="' + tag + '"]');
   }

   // eslint-disable-next-line no-inner-declarations
   function addClickListenersToTags(){
      /* find all links to tags */
      const links = document.querySelectorAll('a[href^="#tag-"]');
      /* START LOOP: for each link */
      for(let link of links){
      /* add tagClickHandler as event listener for that link */
         link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
      }
   }

   addClickListenersToTags();

   // eslint-disable-next-line no-inner-declarations
   function generateAuthors(){
      /* find all articles */
      const articles= document.querySelectorAll(optArticleSelector);
      /* START LOOP: for every article: */
      for(let article of articles){
      /* find author wrapper */
         const articleAuthorList = article.querySelector(optArticleAuthorsSelector);
         /* make html variable with empty string */
         let html = '';
         /* get author from data-author attribute */
         const articleAuthors = article.getAttribute('data-author');
         const linkHTML = '<a href="#author-'+articleAuthors+'"><span>by '+articleAuthors+'</span></a>';
         html=html + linkHTML;
         /* insert HTML of the links into the author wrapper */
         articleAuthorList.innerHTML = html;
         /* END LOOP: for every article: */
      }
   }

   generateAuthors();

   // eslint-disable-next-line no-inner-declarations
   function AuthorClickHandler(event){
      /* prevent default action for this event */
      event.preventDefault();
      /* make new constant named "clickedElement" and give it the value of "this" */
      const clickedElement = this;
      /* make a new constant "href" and read the attribute "href" of the clicked element */
      const href = clickedElement.getAttribute('href');
      console.log(href);
      /* make a new constant "tag" and extract tag from the "href" constant */
      const author = href.replace('#author-', '');
      /* find all tag links with class active */
      const activeAuthors = document.querySelectorAll('a.active');
      /* START LOOP: for each active tag link */
      for(let activeAuthor of activeAuthors){
         /* remove class active */
         activeAuthor.classList.remove('active');
         //console.log(activeAuthor.classList);
         /* END LOOP: for each active tag link */
      }
      /* find all tag links with "href" attribute equal to the "href" constant */
      const authors = document.querySelectorAll('a[href="' + href + '"]'); 
      /* START LOOP: for each found tag link */
      for(let author of authors){
         /* add class active */
         author.classList.add('active');
         /* END LOOP: for each found tag link */
      }
      /* execute function "generateTitleLinks" with article selector as argument */
      generateTitleLinks('[data-author="' + author + '"]');
   }

   // eslint-disable-next-line no-inner-declarations
   function addClickListenersToAuthors(){
      /* find all links to tags */
      const links = document.querySelectorAll('a[href^="#author-"]');
      /* START LOOP: for each link */
      for(let link of links){
      /* add tagClickHandler as event listener for that link */
         link.addEventListener('click', AuthorClickHandler);
      /* END LOOP: for each link */
      }
   }

   addClickListenersToAuthors();
}