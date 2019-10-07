// get html elems
const lightbox = document.querySelector('.lightbox');
const lightbox_img = document.querySelector('.lightbox_img');
const lightbox_img_link = document.querySelector('.lightbox_img_link');
const lightbox_nav_button = document.querySelectorAll('.lightbox_nav_button');
const special_page = document.querySelector('.special_page');

// post ids and constants
let post_id;
const PAGE_ABOUT = -1;
const PAGE_CONTACT = -2;
const PAGE_404 = -3;

// parse url
// TODO: right now very basic, may not follow all typical url rules
const path = window.location.pathname.split('/').filter(c => c);
if(path.length == 1) {
  if(path[0] == 'about')
    post_id = PAGE_ABOUT;
  else if(path[0] == 'contact')
    post_id = PAGE_CONTACT;
  else if((i = parseInt(path[0])) && i > 0 && i.toString() == path[0] && i <= journal.length)
    post_id = parseInt(i);
  else
    post_id = PAGE_404;
} else if(path.length)
  post_id = PAGE_404;
else
  post_id = journal.length;

// page loaders
const load_about_page = _ => {
  special_page.innerHTML = about_page_html;

  lightbox.classList.add('dnone');
  special_page.classList.remove('dnone');
};
const load_contact_page = _ => {
  special_page.innerHTML = contact_page_html;

  lightbox.classList.add('dnone');
  special_page.classList.remove('dnone');
};
const load_404_page = path => {
  special_page.innerHTML = fourofour_page_html.replace(/\%PATH\%/g, path);

  lightbox.classList.add('dnone');
  special_page.classList.remove('dnone');
};
const load_post = post_id => {
  const path = './media/' + journal[post_id-1].file;
  lightbox_img_link.href = path;
  lightbox_img.src = path;

  lightbox_nav_button.forEach((e, i) => {
    e.href = '/' + (i == 0 ? 1
                  : i == 1 ? post_id == 1 ? 1 : post_id - 1
                  : i == 2 ? post_id == journal.length ? post_id : post_id + 1
                  : journal.length)
  });

  special_page.classList.add('dnone');
  lightbox.classList.remove('dnone');
};

// use parsed post_id to begin initialization
switch(post_id) {
  case PAGE_ABOUT: load_about_page(); break;
  case PAGE_CONTACT: load_contact_page(); break;
  case PAGE_404: load_404_page(window.location.pathname); break;
  default: load_post(post_id);
}
