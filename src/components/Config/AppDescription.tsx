export const AppDescription = () => {
  return (
    <>
      <h1 className="text-3xl font-bold pb-4">Aplicación de Editor de Texto Markdown</h1>

      <section className="pb-10">
        <h2 className="text-2xl font-semibold pb-2">Descripción General</h2>
        <p className="text-base pl-4">
          Esta aplicación es un editor de texto Markdown desarrollado utilizando Electron y React,
          con una interfaz de usuario construida en HTML. Está diseñada para proporcionar una
          experiencia de edición de Markdown fluida y eficiente, permitiendo a los usuarios crear y
          editar documentos con facilidad y flexibilidad.
        </p>
      </section>

      <section className="pb-10">
        <h2 className="text-2xl font-semibold pb-2">Tecnologías Utilizadas</h2>
        <h3 className="text-xl font-semibold pb-1">Electron</h3>
        <p className="text-base pl-4">
          Electron es un framework que permite la creación de aplicaciones de escritorio
          multiplataforma utilizando tecnologías web como HTML, CSS y JavaScript. Con Electron, la
          aplicación puede ejecutarse en Windows, macOS y Linux con una sola base de código.
        </p>
        <h3 className="text-xl font-semibold pb-1">React</h3>
        <p className="text-base pl-4">
          React es una biblioteca de JavaScript para construir interfaces de usuario. Facilita la
          creación de componentes reutilizables y la gestión del estado de la aplicación, lo que es
          ideal para una aplicación de editor de texto que requiere actualizaciones dinámicas de la
          interfaz.
        </p>
        <h3 className="text-xl font-semibold pb-1">HTML y Tailwind CSS</h3>
        <p className="text-base pl-4">
          La interfaz de usuario está construida en HTML y estilizada con Tailwind CSS, un framework
          CSS que proporciona clases utilitarias para diseñar rápidamente interfaces modernas y
          responsivas. Además, se utiliza Tailwind Merge para combinar y optimizar las clases CSS de
          manera eficiente.
        </p>
      </section>

      <section className="pb-10">
        <h2 className="text-2xl font-semibold pb-2">Funcionalidades Clave</h2>
        <h3 className="text-xl font-semibold pb-1">Edición en Tiempo Real</h3>
        <p className="text-base pl-4">
          La aplicación permite la edición de texto Markdown en tiempo real, proporcionando una
          vista previa en vivo del contenido formateado. Esto facilita a los usuarios ver los
          cambios inmediatamente mientras escriben.
        </p>
        <h3 className="text-xl font-semibold pb-1">Soporte para Atajos de Teclado</h3>
        <p className="text-base pl-4">
          Se ha implementado un sistema de atajos de teclado que mejora la productividad,
          permitiendo a los usuarios realizar acciones comunes como guardar documentos, deshacer y
          rehacer cambios, y formatear texto sin tener que usar el ratón.
        </p>
        <h3 className="text-xl font-semibold pb-1">Inserción de Imágenes Locales</h3>
        <p className="text-base pl-4">
          Los usuarios pueden insertar imágenes locales directamente en el editor, mejorando la
          capacidad de crear contenido rico y visualmente atractivo. Esta funcionalidad es
          especialmente útil para bloggers, escritores técnicos y cualquier persona que necesite
          incluir imágenes en sus documentos Markdown.
        </p>
        <h3 className="text-xl font-semibold pb-1">Gestión de Estado Eficiente</h3>
        <p className="text-base pl-4">
          La aplicación utiliza una arquitectura de gestión de estado eficiente para manejar los
          cambios en el documento y mantener la interfaz de usuario sincronizada con el contenido
          actual. Esto asegura que los usuarios tengan una experiencia de edición sin problemas y
          sin retrasos.
        </p>
      </section>

      <section className="pb-10">
        <h2 className="text-2xl font-semibold pb-2">Beneficios</h2>
        <ul className="list-disc list-inside text-base pl-10">
          <li>
            <strong>Multiplataforma:</strong> Gracias a Electron, la aplicación puede ser utilizada
            en cualquier sistema operativo principal.
          </li>
          <li>
            <strong>Interfaz Moderna:</strong> Con React y Tailwind CSS, la aplicación ofrece una
            interfaz de usuario atractiva y fácil de usar.
          </li>
          <li>
            <strong>Eficiencia y Productividad:</strong> Las funcionalidades como la edición en
            tiempo real y los atajos de teclado mejoran significativamente la eficiencia del
            usuario.
          </li>
          <li>
            <strong>Flexibilidad:</strong> El soporte para Markdown permite a los usuarios crear
            documentos con una amplia gama de opciones de formateo, desde texto simple hasta
            contenido multimedia.
          </li>
        </ul>
      </section>

      <section className="">
        <h2 className="text-2xl font-semibold pb-2">Conclusión</h2>
        <p className="text-base pl-4">
          Esta aplicación de editor de texto Markdown combina la potencia de Electron y React para
          proporcionar una herramienta de edición robusta y versátil. Con su interfaz moderna,
          funcionalidades avanzadas y soporte multiplataforma, está diseñada para satisfacer las
          necesidades tanto de usuarios casuales como de profesionales que requieren una solución
          eficiente para la creación y edición de documentos Markdown.
        </p>
      </section>
    </>
  )
}
