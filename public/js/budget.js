$(document).ready(function(){
  var loadPage = () =>{
    budget = {
      budgetTotal: 0,
      income: [],
      expense: [],
      budget: 0,
      expenseTotal: 0,   
    }
    console.log("starting budget expense")
    console.log(budget.expense);
    
    
    function loadPage() {
  
      console.log("LoadPage");
     
      $.get("/api/user_data").then(function (data) {
        var id = data.id;
        console.log(id)
        
        
        $.get("/api/income/" + id, function(res){
          //clear out array before rebuilding
          budget.income.length=0;
          for(var i = 0; i<res.length; i++ ){
            console.log("inc push:" + res[i]);
            budget.income.push(res[i]);
          }
        }).then(function(){
          $.get("/api/expenses/"+ id, function(res){
            //clear out array before rebuilding
            budget.expense.length=0;
            for(var i = 0; i<res.length; i++ ){
              console.log("exp push:" + res[i]);
              budget.expense.push(res[i]);
            }
          }).then(function(){
  
             $(".income__list").empty();
             //Clear out income total
            budget.budgetTotal = 0;
            budget.incomeTotal = 0
            budget.expenseTotal = 0
            for(var i = 0; i<budget.income.length; i++ ){
              budget.budgetTotal += budget.income[i].value
              budget.incomeTotal += budget.income[i].value
             var savedIncome = $(`<div class="item clearfix" id="incomeId">
                                  <div class="item__description">${budget.income[i].description}</div>
                                  <div class="right clearfix"><div class="item__value">${"+$" + budget.income[i].value}</div>
                                  <button value="Delete Row" id="${budget.income[i].id}" class="incomeItemDelete"><i class="far fa-trash-alt"></i></button>
                                  </div>
                                  </div>`);
            
             $(".income__list").append(savedIncome)
            }
            $(".expenses__list").empty();
            //Clear out budget total
            
            for(var i = 0; i<budget.expense.length; i++ ){
              budget.budgetTotal -= budget.expense[i].value
              budget.expenseTotal += budget.expense[i].value
              var savedExpense = $(`<div class="item clearfix" id="expensesId">
                                    <div class="item__description">${budget.expense[i].description}</div>
                                    <div class="right clearfix"><div class="item__value">${"-$" + budget.expense[i].value}</div>
                                    <button value="Delete Row" id="${budget.expense[i].id}" class="expenseItemDelete"><i class="far fa-trash-alt"></i></button>
                                    </div>
                                    </div>`);
  
             $(".expenses__list").append(savedExpense)
             
            }
            console.log(budget.budgetTotal)
            $(".budget__value").text("$" + budget.budgetTotal)
            $(".budget__income--value").text("+$" + budget.incomeTotal)
            $(".budget__expenses--value").text("-$" + budget.expenseTotal)
          })
        })
      })
    }
      
      loadPage();
  
      $(document).on("click", ".add__btn", function(event){
        var inputValue =  $('.add__type').val()
    if (inputValue === "inc") {
      var income = {
        description: $(".add__description").val().trim(),
        value: $(".add__value").val().trim(),
        userId: $("#userId").val().trim()
      };
      $.ajax({
        url: "/api/income",
        type: "POST",
        data: income,
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.errors) {
            //if errors returned use first in message
            $(".errors").css("border", "1px solid red");
            $(".error").html(data.errors[0].message);
          }
          loadPage();
        }
      });
    } else{
      var expenses = {
        description: $(".add__description").val().trim(),
        value: $(".add__value").val().trim(),
        userId: $("#userId").val().trim()
      };
      $.ajax({
        url: "/api/expenses",
        type: "POST",
        data: expenses,
        async: false,
        success: function (data, textStatus, jqXHR) {
          if (data.errors) {
            //if errors returned use first in message
            $(".errors").css("border", "1px solid red");
            $(".error").html(data.errors[0].message);
          }
          loadPage();
        }
    
      });
      }
      //Clear Inputs
      console.log("clear");
      $(".add__description").val("");
      $(".add__value").val("");
    });
     
    $(document).on("click", ".incomeItemDelete", function(event){
      console.log("deleted income!");
      event.stopPropagation();
  
     //var id = $(this).data("id") // Can just use id on button
      var id = this.id;
  
        $.ajax({
          method: "DELETE",
          url: "/api/income/" + id,
        }).then(loadPage);
      });
  
      
      $(document).on("click", ".expenseItemDelete", function(event){
        console.log("deleted expense!");
        event.stopPropagation();
        
        //var id = $(this).data("id") // Can just use id on button
         var id = this.id;
     
          $.ajax({
            method: "DELETE",
            url: "/api/expenses/" + id
        }).then(loadPage);
      });
    }
  
    var displayMonth = function(){
      var now,
      month,
      months,
      year;
  
  now = new Date();
  
  months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  month = now.getMonth();
  year = now.getFullYear();
  
    $(".budget__title--month").text(displayMonth = months[month] + " " + year);}
    displayMonth();
    
    loadPage();
  })
  