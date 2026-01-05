<?php
$name = "Janorovic Volkov";
$title = "Wikimedia Toolsmith & Fox-minded Engineer";
$bio = "Pengembang perkakas Wikimedia dengan fokus pada automasi,
anti-vandalisme, dan informatif ramah komunitas.
Menyukai sistem yang rapih, transparan, dan manusiawi.";
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title><?= $name ?></title>
  <link rel="icon" type="image/svg+xml" href="assets/fox.svg">
  <link rel="stylesheet" href="/styles.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body class="intro">
<header class="topbar">
  <button id="menuBtn" aria-label="Menu">☰</button>
  <span class="top-title"><?= $name ?></span>
</header>
<div class="layout">
  <aside class="sidebar collapsed" id="sidebar">
    <div class="brand">
      <span class="logo"><img src="/assets/fox.png" alt="Fox"></span>
      <span class="brand-text"><b>Janorovic Volkov</b></span>
    </div>
    <nav>
      <a href="/" class="active">Beranda</a>
      <a href="/profil">Profil</a>
      <a href="/perkakas">Perkakas</a>
      <a href="/kontak">Kontak</a>
      <a href="/penyangkalan">Penyangkalan</a>
      <hr><br>      
      <footer>
        <small><b>© <?= date("Y") ?> • Janorovic Volkov</b></small>
      </footer>
    </nav>
  </aside>
  <main class="content">
    <section class="profile">
      <div class="avatar">
        <img src="/assets/janorovicvolkov.png" alt="Persona">
        <span class="badge">Human-Fox</span>
      </div>
      <div class="bio">
        <h1><?= $name ?></h1>
        <h2><?= $title ?></h2>
        <p><?= nl2br($bio) ?></p>
      </div>
    </section>
  </main>
</div>
<script src="/script.js"></script>
</body>
</html>
