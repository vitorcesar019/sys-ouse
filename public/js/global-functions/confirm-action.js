/* Função para Exibir modal de confirmação */
function showModal(id, titulo, texto, callback) {
    $(id).find('#titulo').text(titulo);
    $(id).find('#texto').text(texto);
    $(id).modal('show');
    if (typeof callback === 'function') {
        $(id).find('#btnConfirm').click(function () { $(id).modal('hide'); });
        $(id).find('#btnConfirm').click(function () { callback(); });
    }
}

/* Excluir evento */
$(document).on('click', '.btn-delete-event', function () {
    var idEvent = $(this).attr("id");
    showModal('#modalConfirm', 'Excluir Evento?', 'Realmente deseja excluir esse evento?',
        function () {
            $.ajax({
                url: "/agenda/eventos/apagar",
                method: "POST",
                data: { idEvent: idEvent },
                success: function () {
                    $("#alertMessage").show();
                    $('#alertMessage').html('<div id="toast-container" class="toast-top-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-message">Sucesso: evento apagado!</div></div></div>');
                    $('#listEvents').DataTable().ajax.reload(); //atualiza somente o data table, sem dar refresh na pagina
                },
                error: function () {
                    $("#alertMessage").show();
                    $('#alertMessage').html('<div id="toast-container" class="toast-top-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-message">Erro: evento não apagado!</div></div></div>');
                    $('#listEvents').DataTable().ajax.reload();
                }
            });
        }
    );
});

/* Modal confirma mudar status evento */
$(document).on('click', '.span-update-status', function () {
    var id = $(this).attr("id");
    showModal('#modalConfirm', 'Alterar Status', 'Realmente deseja alterar o status desse registro?',
        function () {
            $.ajax({
                url: "/agenda/eventos/mudar-status",
                method: "POST",
                data: { id: id },
                success: function () {
                    $("#alertMessage").show();
                    $('#alertMessage').html('<div id="toast-container" class="toast-top-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-message">Sucesso: status alterado!</div></div></div>');
                    $('#listEvents').DataTable().ajax.reload();
                },
                error: function () {
                    $("#alertMessage").show();
                    $('#alertMessage').html('<div id="toast-container" class="toast-top-right"><div class="toast toast-error" aria-live="polite" style=""><div class="toast-message">Erro: status não alterado!</div></div></div>');
                    $('#listEvents').DataTable().ajax.reload();
                }
            });
        }
    );
});

/* Excluir Usuario */
$(document).on('click', '.btn-delete-user', function () {
    var idUser = $(this).attr("id");
    showModal('#modalConfirm', 'Excluir Usuário?', 'Realmente deseja excluir esse usuário?',
        function () {
            $.ajax({
                url: "/usuarios/apagar",
                method: "POST",
                data: { idUser : idUser },
                success: function () {
                    $("#alertMessage").show();
                    $('#alertMessage').html('<div id="toast-container" class="toast-top-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-message">Sucesso: usuário apagado!</div></div></div>');
                    $('#listUsers').DataTable().ajax.reload();
                },
                error: function () {
                    $("#alertMessage").show();
                    $('#alertMessage').html('<div id="toast-container" class="toast-top-right"><div class="toast toast-success" aria-live="polite" style=""><div class="toast-message">Erro: usuário não apagado!</div></div></div>');
                    $('#listUsers').DataTable().ajax.reload();
                }
            });
        }
    );
});