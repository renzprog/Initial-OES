<header>
        <div id="logo-holder">
            <img src="logo.png" alt="" style="width:50px;height:50px";>
            Andres Bonifacio Integrated School
       </div> 
        <nav>
            <?php 
            if(isset($_SESSION["role"])){
            ?>
            <a href="dashboard.html">Dashboard</a>
            <a href="view-students.html">Students</a>
            <a href="settings-acc.html">Settings</a>
            <a href="login.php">Logout</a>
            <?php 
            }else{
            ?>
                <a href="login.php">Login</a>
            <?php }
            ?>        
        </nav>
</header>