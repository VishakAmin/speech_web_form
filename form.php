<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data</title>
</head>
<body>

    First Name : <?php if($_POST["FName"]==''){echo "N/a"; } else {echo $_POST["FName"]; }?><br>
    Last  Name : <?php if($_POST['LName']=='') {
                        echo "N/a";
                    } else 
                    {
                        echo $_POST["LName"]; 
                        }
                        ?>
                    <br>
    Age        : <?php if($_POST["Age"]==''){
                        echo "N/a"; }else {echo $_POST["Age"]; }?><br>
    Sex        : <?php if($_POST["Sex"]==''){
                        echo "N/a";}else{echo $_POST["Sex"]; }?><br>
    Phone      : <?php if ($_POST["Phone"]==''){
                        echo "N/a";}else{ echo $_POST["Phone"];} ?><br>
    Address    : <?php if($_POST["Address"]==''){
                        echo "N/a";} else {echo $_POST["Address"]; }?>
    Message :    <?php if($_POST["Message"]==''){echo "N/a";}else{ echo $_POST["Message"];} ?>
    
</body>
</html>