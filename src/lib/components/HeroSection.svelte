<script lang="ts">
	import bookCover from '$assets/book_cover.png';
	import phoneCover from '$assets/phone_cover.png';
    import Button from '$components/Button.svelte'
</script>

<section class="hero">
	<div class="hero-showcase text-centre bold">
		<h1 class="purple">MOVE TO</h1>
		<h1 class="purple mb-xs">SPAIN</h1>
		<h4 class="semi-bold italic">There's no need to make the same mistakes I Made.</h4>
		<img class="book-cover" src={bookCover} alt="" />
		<img class="phone-cover" src={phoneCover} alt="" />
	</div>

	<div class="hero-text white text-center">
		<h1>THIS E-BOOK WILL</h1>
		<h1>SAVE YOU MONEY,</h1>
		<h1 class="mb-m">TIME & NERVES</h1>
		<p class="light-grey mb-l">
			I moved to Spain 7 years ago. The process was painful and difficult. I learned most things the
			hard way: finding a job, getting a visa, calculating my cost of living, choosing an
			apartments. That's why I wrote this e-book, to tell you how I did it. No bullshit, no stress.
		</p>

        <Button> Purchase E-book for £10</Button>
	</div>
</section>

<style> 
    .hero{
        display: flex;
        height: 100vh;
        overflow-y: hidden;
    }
    .hero-showcase{
        position: relative;
        width: 50%;
        padding: 100px 16px 0 16px;
        background: linear-gradient(
            135deg,
            #e2cbff,
            #e2cbff 25%,
            #e2cbff 50%,
            #e2cbff 75%,
            #927bce
        );
    }

    .hero-text{
        padding: 100px 5%;
        width: 50%;
        background-color: black;
    }

    .book-cover{
        position: absolute;
        right: 2%;
        bottom: 0;
        width: 65%;
        transform: translateY(30%);

    }
    .phone-cover{
        position: absolute;
        right: 52%;
        bottom: 0;
        width: 35%; 
        transform: translateY(25%) ; 
    }
</style>