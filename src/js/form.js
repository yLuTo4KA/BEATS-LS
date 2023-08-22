(function(){
    const myForm = document.querySelector('.form__order');
const sendForm = $('#buy');


const validateFields = function (form, fieldsArray) {
    fieldsArray.forEach(field => {
        field.removeClass('form__input--error')
        if (field.val().trim() === "") {
            field.addClass('form__input--error')
        }
    })
    const errorFields = form.find('.form__input--error');
    return errorFields.length == 0;
}
sendForm.on('click', function (e) {
    e.preventDefault();

    const form = $('.form');
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");
    const content = $('.modal__content');
    const isValid = validateFields(form, [name, phone, comment, to])
    content.removeClass('modal__content--error');
    if (isValid) {
        const request = $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val(),
            },
        });
        request.done(data => {
            content.text(data.message)
        });
        request.fail(data => {
            content.text('Произошла ошибка, попробуйте позднее.');
            content.addClass('modal__content--error');
        });
        request.always(data => {
            $.fancybox.open({
                src: "#modal",
                type: "inline"
            })
        })

    }

})
$('.app-submit-btn').on('click', function (e) {
    e.preventDefault();
    $.fancybox.close();
})


})()