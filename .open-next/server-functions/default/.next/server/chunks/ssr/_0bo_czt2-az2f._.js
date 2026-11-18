module.exports=[2946,20775,96616,88673,34403,a=>{"use strict";var b=a.i(82713),c=a.i(20290),d=a.i(31920);a.s(["default",()=>d.Image],20775);var d=d;let e=[{tint:"#E4EBFF",strong:"#2B4BFF",ink:"#0B0B0C"},{tint:"#FFE6DE",strong:"#FF5A36",ink:"#0B0B0C"},{tint:"#DDF3E8",strong:"#0F9D6B",ink:"#0B0B0C"},{tint:"#FFF1C9",strong:"#E0A800",ink:"#0B0B0C"},{tint:"#EAE3FF",strong:"#6A4CFF",ink:"#0B0B0C"},{tint:"#DDEFF6",strong:"#1388B8",ink:"#0B0B0C"}];function f({seed:a}){let c=Math.abs(Array.from(a).reduce((a,b)=>31*a+b.charCodeAt(0),0))%e.length,d=e[c];return(0,b.jsxs)("div",{"aria-hidden":"true",className:"relative h-full w-full overflow-hidden",style:{background:d.tint},children:[0===c&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"absolute -left-[12%] top-[-25%] h-[75%] w-[75%] rounded-full bg-[var(--ink)]",style:{background:d.ink}}),(0,b.jsx)("div",{className:"absolute left-[8%] top-[55%] h-[22%] w-[22%] rounded-full",style:{background:d.strong}})]}),1===c&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"absolute bottom-[-45%] left-[8%] h-[84%] w-[84%] rounded-full",style:{background:d.strong}}),(0,b.jsx)("div",{className:"absolute left-[60%] top-[12%] h-[14%] w-[14%]",style:{background:d.ink}})]}),2===c&&(0,b.jsx)(b.Fragment,{children:Array.from({length:5}).map((a,c)=>(0,b.jsx)("div",{className:"absolute bottom-0",style:{left:`${10+16*c}%`,width:"9%",height:`${35+12*c}%`,background:c%2==0?d.ink:d.strong}},c))}),3===c&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"absolute left-[8%] top-[12%] rounded-full",style:{width:"62%",height:"70%",backgroundImage:`radial-gradient(${d.ink} 3px, transparent 3px)`,backgroundSize:"26px 26px"}}),(0,b.jsx)("div",{className:"absolute bottom-[10%] right-[8%] h-[26%] w-[26%] rounded-full",style:{background:d.strong}})]}),4===c&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"absolute left-[-10%] top-[42%] h-[20%] w-[120%]",style:{background:d.ink,transform:"rotate(-16deg)"}}),(0,b.jsx)("div",{className:"absolute left-[-10%] top-[66%] h-[9%] w-[120%]",style:{background:d.strong,transform:"rotate(-16deg)"}})]}),5===c&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"absolute right-[-12%] top-[8%] h-[62%] w-[62%] rounded-full border-[7px]",style:{borderColor:d.ink}}),(0,b.jsx)("div",{className:"absolute right-[2%] top-[24%] h-[38%] w-[38%] rounded-full border-[7px]",style:{borderColor:d.strong}}),(0,b.jsx)("div",{className:"absolute right-[12%] top-[36%] h-[14%] w-[14%] rounded-full",style:{background:d.ink}})]})]})}function g(){return(0,b.jsxs)("svg",{viewBox:"0 0 24 24","aria-hidden":"true",className:"h-4 w-4",fill:"none",stroke:"currentColor",strokeWidth:"1.8",children:[(0,b.jsx)("path",{d:"M5 19 19 5",strokeLinecap:"round"}),(0,b.jsx)("path",{d:"M8 5h11v11",strokeLinecap:"round",strokeLinejoin:"round"})]})}a.s(["f",0,f],96616),a.s(["f",0,function({project:a,layout:e="regular",priority:h=!1}){let i="wide"===e,j=a.services.slice(0,3),k=Math.max(0,a.services.length-j.length);return(0,b.jsxs)("article",{className:"group flex min-w-[min(100%,300px)] flex-col gap-3",children:[(0,b.jsx)("div",{className:"overflow-hidden rounded-[20px]",style:{background:a.cardBackground},children:(0,b.jsx)("div",{className:"project-zoom h-full w-full overflow-hidden rounded-[20px]",children:(0,b.jsx)("div",{className:`relative overflow-hidden ${i?"aspect-[16/10]":"aspect-[4/3]"}`,style:{background:a.cardBackground},children:a.thumbnail?(0,b.jsx)(d.Image,{src:a.thumbnail.url,alt:a.thumbnail.alt,fill:!0,priority:h,sizes:i?"(min-width: 1000px) 50vw, 100vw":"(min-width: 1000px) 33vw, 100vw",className:"object-cover",style:{objectPosition:a.thumbnailFocus}}):(0,b.jsx)(f,{seed:a.slug})})})}),(0,b.jsxs)("div",{className:"flex flex-col gap-3",children:[(0,b.jsx)("h3",{className:`font-[family-name:var(--font-display)] font-semibold tracking-[-0.025em] text-[#0B0B0C] ${i?"text-[30px] leading-[1.15]":"text-[24px] leading-[1.15]"}`,children:a.title}),(0,b.jsxs)("div",{className:"flex flex-wrap gap-2",children:[j.map(a=>(0,b.jsx)("span",{className:"inline-flex items-center rounded-full border border-[var(--pill)] px-[12px] py-[5px] text-[12px] font-medium text-[#3D4249]",children:a.name},a.slug)),k>0&&(0,b.jsxs)("span",{className:"inline-flex items-center rounded-full border border-[var(--pill-2)] px-[12px] py-[5px] text-[12px] font-medium text-[#5B6068]",children:["+",k]})]}),(0,b.jsxs)(c.default,{href:`/projects/${a.slug}`,className:"project-link inline-flex items-center gap-[8px] text-[15px] font-semibold text-[#0B0B0C] transition-all duration-200",children:[(0,b.jsx)("span",{children:"Show project"}),(0,b.jsx)("span",{className:"flex h-5 items-center justify-center",children:(0,b.jsx)(g,{})})]})]})]})}],2946);let h=process.env.WP_GRAPHQL_URL;async function i(a,b){let c,d;if(!h)throw Error("WP_GRAPHQL_URL is missing. Set it in .env.local to the WordPress GraphQL endpoint.");try{c=await fetch(h,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({query:a,variables:b}),next:{revalidate:300,tags:["projects"]}})}catch(b){let a=b instanceof Error?b.message:"Unknown network error";throw Error(`Could not reach WordPress GraphQL at ${h}: ${a}`)}if(!c.ok)throw Error(`WordPress GraphQL returned HTTP ${c.status} ${c.statusText}.`);try{d=await c.json()}catch{throw Error("WordPress GraphQL returned an invalid JSON response.")}if(d.errors?.length)throw Error(`WordPress GraphQL error: ${d.errors.map(a=>a.message).join("; ")}`);if(!d.data)throw Error("WordPress GraphQL response did not contain data.");return d.data}function j(a,b){if(a?.sourceUrl)return{url:a.sourceUrl,alt:a.altText?.trim()||b,width:a.mediaDetails?.width||1600,height:a.mediaDetails?.height||1e3}}function k(a){var b;let c,d=a.projectDetails,e=d?.clientName?.trim()||a.title,f=`${e} project screenshot`,g=j(a.featuredImage?.node,f),h=j(d?.heroImage?.node,f),i=function(a){if(!a?.trim())return{};try{let b=new URL(a);return{websiteUrl:a,domain:b.hostname.replace(/^www\./,"")}}catch{return{}}}(d?.websiteUrl);return{id:a.databaseId,slug:a.slug,title:e||a.title,clientName:e,shortIntro:d?.shortIntro?.trim()||"",industry:d?.industry?.trim()||void 0,year:d?.projectYear?.trim()||void 0,websiteUrl:i.websiteUrl,domain:i.domain,cardBackground:d?.cardBackground||"#EEF0F4",thumbnailFocus:"center"===(c=Array.isArray(b=d?.thumbnailFocus)?b[0]:b)||"bottom"===c?c:"top",thumbnail:g,hero:h||g,gallery:(d?.gallery?.nodes??[]).map(a=>j(a,f)).filter(a=>!!a),services:(a.projectServices?.nodes??[]).filter(a=>!!(a.slug&&a.name)).map(a=>({slug:a.slug,name:a.name})),categories:(a.projectCategories?.nodes??[]).map(a=>a.slug).filter(a=>!!a),relatedSlugs:(d?.relatedProjects?.nodes??[]).map(a=>a.slug).filter(a=>!!a),order:a.menuOrder??Number.MAX_SAFE_INTEGER,date:a.date??""}}let l=`
  query AllProjects {
    projects(
      first: 100
      where: {
        status: PUBLISH
        orderby: [
          { field: MENU_ORDER, order: ASC }
          { field: DATE, order: DESC }
        ]
      }
    ) {
      nodes {
        databaseId
        slug
        title
        menuOrder
        date
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        projectServices { nodes { slug name } }
        projectCategories { nodes { slug name } }
        projectDetails {
          clientName
          shortIntro
          industry
          projectYear
          websiteUrl
          cardBackground
          thumbnailFocus
        }
      }
    }
  }
`,m=`
  query ProjectBySlug($slug: ID!) {
    project(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      menuOrder
      date
      featuredImage {
        node {
          sourceUrl
          altText
          mediaDetails { width height }
        }
      }
      projectServices { nodes { slug name } }
      projectCategories { nodes { slug name } }
      projectDetails {
        clientName
        shortIntro
        industry
        projectYear
        websiteUrl
        cardBackground
        thumbnailFocus
        heroImage {
          node {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        gallery {
          nodes {
            sourceUrl
            altText
            mediaDetails { width height }
          }
        }
        relatedProjects { nodes { ... on Project { slug title } } }
      }
    }
  }
`;async function n(){let a=await i(l);return(a.projects?.nodes??[]).map(k)}async function o(a){let b=await i(m,{slug:a});return b.project?k(b.project):null}a.s(["h",0,n,"A",0,function(a,b){if(0===a.length)return null;let c=a.findIndex(a=>a.slug===b);return a[((c>=0?c:0)+1)%a.length]??null},"O",0,o,"Q",0,function(a,b){return b&&"all"!==b?a.filter(a=>a.categories.includes(b)):a}],88673);let p="https://www.craft-crew.com",q=[{label:"Home",href:`${p}/`},{label:"About",href:`${p}/about`},{label:"Services",href:`${p}/services`},{label:"Solutions",href:`${p}/solutions`},{label:"Projects",href:"/projects",current:!0},{label:"Clients",href:`${p}/clients`},{label:"Team",href:`${p}/team`}];a.s(["O",0,{egypt:{phone:"+20 110 324 9933",tel:"tel:+201103249933",whatsapp:"https://wa.me/201103249933?text=Hello%20Craft%20Crew%2C%20I%27d%20like%20to%20discuss%20a%20project."},saudi:{phone:"+966 56 055 1730",tel:"tel:+966560551730",whatsapp:"https://wa.me/966560551730?text=Hello%20Craft%20Crew%2C%20I%27d%20like%20to%20discuss%20a%20project."},socials:[{label:"LinkedIn",href:"https://www.linkedin.com/company/craftcreweg"},{label:"X",href:"https://x.com/craftcreweg"},{label:"Facebook",href:"https://www.facebook.com/Craftcrewltd"},{label:"Instagram",href:"https://www.instagram.com/craftcreweg"}]},"G",0,p,"o",0,q],34403)},1688,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(9947);a.n(d("[project]/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/client/image-component.js"))},31920,a=>{"use strict";var b=a.i(1688);a.n(b)}];

//# sourceMappingURL=_0bo_czt2-az2f._.js.map