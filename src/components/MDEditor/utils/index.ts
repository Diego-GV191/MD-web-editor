export * from './RenderComponets'
// import ReactDOMServer from 'react-dom/server'
// import {
//   BlockCode,
//   BlockQuote1,
//   BlockQuote2,
//   Header1,
//   Header2,
//   Header3,
//   Header4,
//   Header5,
//   Header6,
//   Links,
//   OrderList,
//   Paragraph,
//   UnOrderList,
// } from './RenderComponets'
// import { syntaxEnum } from '@renderer/components/FormPopUp'

// export * from './RenderComponets'

// class _marked {
//   private _mdConverted = ''

//   constructor() {}

//   render(text: string) {
//     if (text.startsWith(syntaxEnum.header1)) {
//       return ReactDOMServer.renderToString(Header1({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.header2)) {
//       return ReactDOMServer.renderToString(Header2({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.header3)) {
//       return ReactDOMServer.renderToString(Header3({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.header4)) {
//       return ReactDOMServer.renderToString(Header4({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.header5)) {
//       return ReactDOMServer.renderToString(Header5({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.header6)) {
//       return ReactDOMServer.renderToString(Header6({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.blockQuote1) && !text.startsWith(syntaxEnum.blockQuote2)) {
//       return ReactDOMServer.renderToString(BlockQuote1({ text: text }))
//     }
//     if (text.startsWith(syntaxEnum.blockQuote2)) {
//       return ReactDOMServer.renderToString(BlockQuote2({ text: text }))
//     }
//     return ReactDOMServer.renderToString(Paragraph({ text: text }))
//   }

//   renderOrderList(items: string[]) {
//     return ReactDOMServer.renderToString(OrderList({ items }))
//   }

//   renderUnOrderList(items: string[]) {
//     return ReactDOMServer.renderToString(UnOrderList({ items }))
//   }

//   renderBloakcCode(items: string[], lang: string) {
//     return ReactDOMServer.renderToString(BlockCode({ text: items.slice(1).join('\n'), lang: lang }))
//   }

//   renderLinks(item: string, link: string) {
//     return ReactDOMServer.renderToStaticMarkup(Links({ text: item, links: link }))
//   }

//   value(value: string) {
//     this._mdConverted += value
//   }

//   get getValue() {
//     return this._mdConverted
//   }
// }

// export const mdToHTML = (value: string) => {
//   let lines = value.split(/\n\n|\n/)
//   let ren = new _marked()

//   let OrderListItems: string[] = []
//   let UnOrderListItems: string[] = []
//   let BlockCodeItems: string[] = []

//   let ReadingCode = false
//   let codeLang = ''

//   lines.forEach((item) => {
//     if (item.startsWith(syntaxEnum.orderList)) {
//       OrderListItems.push(item)
//       return
//     }

//     if (OrderListItems.length > 0) {
//       ren.value(ren.renderOrderList(OrderListItems))
//       OrderListItems = []
//     }

//     if (item.startsWith(syntaxEnum.unorderList)) {
//       UnOrderListItems.push(item)
//       return
//     }

//     if (UnOrderListItems.length > 0) {
//       ren.value(ren.renderUnOrderList(UnOrderListItems))
//       UnOrderListItems = []
//     }

//     if (ReadingCode) {
//       if (item.startsWith(syntaxEnum.code)) {
//         ren.value(ren.renderBloakcCode(BlockCodeItems, codeLang))
//         BlockCodeItems = []
//         ReadingCode = false
//         return
//       }
//       BlockCodeItems.push(item)
//       return
//     }

//     if (item.startsWith(syntaxEnum.code)) {
//       codeLang = item.substring(syntaxEnum.code.length).trim()
//       BlockCodeItems.push(item)
//       ReadingCode = true
//       return
//     }

//     if (item.startsWith(syntaxEnum.links)) {
//       const partLink = item.split(/(\[[^*]+\])/g).slice(1)

//       ren.value(ren.renderLinks(partLink[0], partLink[1].slice(1, -1)))
//       return
//     }

//     ren.value(ren.render(item))
//   })

//   return ren.getValue
// }

// // First render

// // export const mdToHTML = (value) => {
// //   let html = value
// //     // Encabezados
// //     .replace(
// //       /^###### (.*$)/gim,
// //       '<h6 class="text-2xl font-bold py-3 my-2" id="$1">$1<hr class="border-neutral-500/50 mt-5"/></h6>',
// //     )
// //     .replace(
// //       /^##### (.*$)/gim,
// //       '<h5 class="text-3xl font-bold py-3 my-2" id="$1">$1<hr class="border-neutral-500/50 mt-5"/></h5>',
// //     )
// //     .replace(
// //       /^#### (.*$)/gim,
// //       '<h4 class="text-4xl font-bold py-3 my-2" id="$1">$1<hr class="border-neutral-500/50 mt-5"/></h4>',
// //     )
// //     .replace(
// //       /^### (.*$)/gim,
// //       '<h3 class="text-5xl font-bold py-3 my-2" id="$1">$1<hr class="border-neutral-500/50 mt-5"/></h3>',
// //     )
// //     .replace(
// //       /^## (.*$)/gim,
// //       '<h2 class="text-6xl font-bold py-3 my-2" id="$1">$1<hr class="border-neutral-500/50 mt-5"/></h2>',
// //     )
// //     .replace(
// //       /^# (.*$)/gim,
// //       '<h1 class="text-7xl font-bold py-3 my-2" id="$1">$1<hr class="border-neutral-500/50 mt-5"/></h1>',
// //     )
// //     // Negritas y cursivas
// //     .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
// //     .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
// //     .replace(/\*(.*?)\*/gim, '<em>$1</em>')
// //     // Listas no ordenadas
// //     .replace(/^\s*([-+*])\s+(.*$)/gm, '<li class="no-order">$2</li>')
// //     .replace(/(<li class="no-order">.*<\/li>\n?)+/gm, '<ul class="list-disc pl-12">$&</ul>')
// //     // Listas ordenadas
// //     .replace(/^\s*\d+\.\s+(.*$)/gm, '<li class="order">$1</li>')
// //     .replace(/(<li class="order">.*<\/li>\n?)+/gm, '<ol class="list-decimal pl-12">$&</ol>')
// //     // Citas
// //     .replace(
// //       /^\>\s+\>\s+(.*$)/gim,
// //       '<blockquote class="pl-4 border-l-4 border-gray-400"><blockquote class="pl-4 border-l-4 border-gray-400">$1</blockquote></blockquote>',
// //     )
// //     .replace(
// //       /^\>\s+(.*$)/gim,
// //       '<blockquote class="pl-4 border-l-4 border-gray-400">$1</blockquote>',
// //     )
// //     // Imágenes
// //     .replace(/\!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="my-2" />')
// //     // Enlaces
// //     .replace(
// //       /\[([^\]]+)\]\(([^)]+)\)/gim,
// //       '<p><a href="$2" class="text-blue-500 underline">$1</a></p>',
// //     )
// //     // Bloque de códigos
// //     .replace(
// //       /^```(\w*)\n([\s\S]*)\n```/gim,
// //       '<div class="bg-gray-800 p-2 rounded w-fit"><pre>$2</pre></div>',
// //     )
// //     // Código de linea
// //     .replace(/`(.*?)`/gim, '<code class="bg-gray-700 p-1 rounded">$1</code>')

// //   // Envolver el texto en párrafos si no es un encabezado o un bloque
// //   html = html
// //     .split('\n\n')
// //     .map((line) => {
// //       if (/^<h[1-6]>|<ul>|<ol>|<blockquote>/.test(line)) {
// //         return line
// //       }
// //       if (line === '') return
// //       return `<p>${line}</p>`
// //     })
// //     .join('')

// //   // Eliminamos duplicados
// //   html = html.replace(/<\/ul>\s*<ul>/g, '').replace(/<\/ol>\s*<ol>/g, '')
// //   // console.log(html)
// //   return html
// // }
