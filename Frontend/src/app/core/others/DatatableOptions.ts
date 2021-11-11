export const DT_OPTIONS = {

  destroy: true,
  processing: true,
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: "copy",
      className: "btn_table copy",
      text: "<i class='far fa-copy'></i>",
      tag: "data-toggle='tooltip' data-placement='top' title='Copiar al Portapapeles'"
    },
    {
      extend: "excel",
      className: "btn_table excel",
      text: "<i class='far fa-file-excel'></i>",
      tag: "data-toggle='tooltip' title='Descargar en excel'"
    },
    {
      extend: "pdf",
      className: "btn_table pdf",
      text: "<i class='far fa-file-pdf'></i>",
      tag: "data-toggle='tooltip' data-placement='top' title='Descargar en pdf'"
    }
  ],
  language: {
    "url": '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json',
    buttons: {
      copyTitle: 'Copiado al portapapeles',
      copySuccess: {
        _: 'Copiadas %d filas',
        1: 'Copiada 1 fila'
      },
    }
  },

  responsive: true,
  scrollY: '50vh',
  paging: false,
  colReorder: false,
}

