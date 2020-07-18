$(document).ready(function () {
  $('#formRegisterEvent').validate({
    rules: {
      startDateRegister: { required: true},
      startTimeRegister: { required: true, time: true },
      endTimeRegister: { required: true, greaterThan: '#startTimeRegister' }, //metodo lessThan se fosse menor
      nameRegister: { required: true},
      surnameRegister: { required: true },
      cellphoneRegister: { require_from_group: [1, ".contact"] },
      telephoneRegister: { require_from_group: [1, ".contact"] },
      cep: { required: true, postalcodeBR: true },
      logradouro: { required: true },
      bairro: { required: true },
      localidade: { required: true },
      uf: { required: true },
      typeResidence: { required: true },
      numberRegister: { required: true },
      streetCondominiumRegister: { required: true },
      edificeRegister: { required: true },
      blockRegister: { required: true },
      apartmentRegister: { required: true },
      bairro: { required: true },
      clientRegister: { required: true },
      //digits: true somente numeros
    },

    messages: {
      startDateRegister: { required: "Digite a Data Inicial." },
      startTimeRegister: { required: "Digite a Hora Inicial.", time: "Tempo errado" },
      endTimeRegister: { required: "Digite a Hora Final.", greaterThan: "informe um horário superior." },
      nameRegister: { required: "Digite um Nome.", minlength: "No mínimo 2 letras" },
      surnameRegister: { required: "Digite um Sobrenome." },
      cellphoneRegister: { require_from_group: "Digite um Celuar ou Telefone." },
      telephoneRegister: { require_from_group: "Digite um Celuar ou Telefone." },
      cep: { required: "Digite um CEP." },
      logradouro: { required: "Digite o Logradouro." },
      bairro: { required: "Digite o Bairro." },
      localidade: { required: "Digite a Cidade." },
      uf: { required: "Digite o Estado." },
      typeResidence: { required: "Selecione uma opção." },
      numberRegister: { required: "Digite o número da casa." },
      streetCondominiumRegister: { required: "Digite a rua do Condomínio." },
      edificeRegister: { required: "Digite o Edifício." },
      blockRegister: { required: "Digite o Bloco." },
      apartmentRegister: { required: "Digite o Apartamento." },
      bairro: { required: "Digite o Bairro" },

      clientRegister: { required: "Selecione uma Pessoa." },
    },

    errorElement: 'span',
    errorPlacement: function (error, element) {
      error.addClass('invalid-feedback');
      element.closest('.form-group').append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass('is-invalid');
    },

    submitHandler: function (form) {
      //event.preventDefault();
      var dados = $(form).serialize();
      $.ajax({
        type: "POST",
        url: "/agenda/calendario/cadastar",
        data: dados,
        processData: false,
        success: function (retorna) {
          if (retorna['sit']) {
            //$("#msg-cad").html(retorna['msg']);
            location.reload();
          } else {
            $("#msg-cad").html(retorna['msg']);
          }
        }
      });
      return false;
    }
  });
});
