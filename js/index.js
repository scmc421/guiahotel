$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='tooltip']").popover();
    $('tooltip').carousel({
      interval:2000
    });
    $('#contacto').on('show.bs.modal', function (e){
        console.log('el Modal Contacto se está Mostrando');

        $('#contactoBtn').removeClass('btn-outline-success');
        $('#contactoBtn').addClass('btn-primary');

    });
    $('#contacto').on('shown.bs.modal', function(e){
        console.log('el Modal Contacto SE MOSTRÓ');
    });
    $('#contacto').on('hide.bs.modal', function(e){
        console.log('El Modal Contactto Se Oculta');
    });
    $('#conctacto').on('hidden.bs.modal', function(e){
        console.log('El Modal contacto se ocultó');
    });
});