(function(){

    /* Hide A */
    var weightTable = $('#weightTable');
    $('body').on("change", "tr.day-B select", function(){
        // var aDays = $('tr.day-A');
        if($(this).val() > 0){
            // aDays.hide();
            $('#weightTable').addClass('show-b-days');
        } else {
            // aDays.show();
            $('#weightTable').removeClass('show-b-days');
        }
    });

    /* Hide B days */
    $('body').on("change", "tr.day-A select", function(){
        // var bDays = $('tr.day-B');
        if($(this).val() > 0){
            // bDays.hide();
            $('#weightTable').addClass('show-a-days');
        } else {
            // bDays.show();
            $('#weightTable').removeClass('show-a-days');
        }
    });

    /* Set current based on previous weight lifted */
    $('body').on("click", "td.prev-weight-and-reps div.previous-weight", function(){
        var $this = $(this),
            previousWeight = $this.text(),
            dropdown = $this.parent().siblings('.weight-dropdown').find('select');
        if(previousWeight > 0){
            if(dropdown.val() == 0){
                dropdown.val(previousWeight);
            } else {
                dropdown.val(parseInt(dropdown.val()) + 5);
            }
            dropdown.change();
        }
    });
    
})();