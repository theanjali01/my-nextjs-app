import { NextResponse } from "next/server";
import { initDb, createDbPost, getAllDbPosts } from "@/lib/db";

const mustangContent = `The drive into Mustang begins somewhere after Kagbeni, where the road narrows and the valley opens into something that doesn't feel entirely real. The cliffs are ochre and rust and a pale kind of lavender that I don't have a good word for. The wind is constant — not strong enough to knock you over, just present enough that you're always aware of it, like a companion that never speaks.

I had my phone out the whole way. I had my camera out. I was filming everything.

![On the road to Mustang — turquoise lake, prayer flags, pine trees](/images/mustang/IMG_4989.jpg)

---

It wasn't all of it. I want to be precise about that. I didn't lose everything — but I lost the ones that mattered most. The 80% I had replayed in my head on the drive home. The ochre cliffs at dusk. The prayer flags snapping in the wind above Lo Manthang. A moment where the light went golden and strange for about four minutes and I knew even while it was happening that I would want this back later.

Gone. A corrupted folder. Files that opened as static.

The first feeling was the obvious one. A sick dropping in the stomach. Something between grief and stupidity — grief for the footage, stupidity for not backing it up sooner.

But then, sitting with it for a few days, I started to notice something else.

> I remembered Mustang more clearly than any place I'd brought footage home from.

---

![Standing above the valley](/images/mustang/IMG_0877.jpg)

I remember the exact quality of the light at Lo Manthang in the late afternoon. The way it hit the white walls of the buildings and made them look warm instead of white. I remember standing somewhere up high with the whole valley below me, arms crossed against the cold, not filming anything — just standing there because there was nothing else to do.

I remember thinking, while I was filming the other moments, that I needed to *get this*. Get the light, get the movement, get it into my phone so I could keep it. And I was so focused on getting it that I was standing slightly outside the experience. Watching it through a screen instead of with my eyes.

The clips I lost were the ones I was most present for *in theory* — the ones I knew were beautiful while they were happening. But I was present for them as a filmmaker, not as a person. The ones I kept are the ones I almost didn't bother to film.

---

There's a guesthouse I remember stopping at. Somewhere before we reached the higher elevations. Red walls the color of dried chilies, a woven blanket thrown over a wooden chair, pine branches on the floor. Snow visible through an old window. It smelled like woodsmoke and something faintly sweet.

I don't think I filmed it at all. I just sat there for a while.

That room is clearer to me now than most of the footage I have.

---

I'm not trying to make a case against cameras or phones. I'm not going to leave mine at home next time.

But I think about the footage I didn't take — the moments where I put the phone down and just stood there — and those are the ones with the most texture now. The ones I can still feel the temperature of.

Mustang taught me something I didn't go there to learn: that the point of being somewhere isn't to prove you were there. It's just to be there. Fully. Even if you can't show anyone afterward.

The clips I lost were beautiful. But maybe they were always meant to stay in Mustang.

---

*The trip was in early 2026. I went with two friends and a driver who kept stopping to pray at roadside shrines, which added about three hours to every journey and which I now think was the right call.*`;

const overlookContent = `There is a specific kind of not-seeing that happens when something has been there long enough.

Not blindness. You can describe the thing. You know it exists. But you stopped actually looking at it somewhere along the way — the way you stop hearing a fan in the background, the way a scar on your hand becomes just part of your hand.

I noticed this about my own city recently. I've walked the same stretch of road for years. Temples I've passed hundreds of times, a chautara under a pipal tree where old men sit every morning, a painted wall that someone clearly cared about once. I know they are there. But I haven't *seen* them in a long time.

---

It happens with people too, maybe more than anything else.

There is someone in most of our lives who has been so consistently present that we've stopped registering them with fresh eyes. A parent who has quietly rearranged their life around yours. A friend who always picks up when you call, so you've stopped noticing what a thing that is. A neighbor who nods every morning, whose name you never learned.

We reserve our attention for what is new or loud or threatening. Everything else gets filed under *familiar* and left there.

---

I think familiarity is one of the stranger tricks the mind plays on us. It presents itself as knowledge — *I know this, I know this person, I know this place* — but what it often means is: I have stopped updating my understanding of this thing. I took a snapshot a long time ago and I have been looking at the snapshot ever since.

The actual thing kept changing. The person kept changing. And I missed it, not through any malice, but through the quiet autopilot of routine.

---

What would it mean to look again?

Not dramatically. Not with some forced gratitude exercise or a list you write and forget. Just — the next time you are somewhere you have been a hundred times, or with someone you have known for years, to let yourself be slightly uncertain. To admit that you might not have the full picture. To look the way you looked the first time, when you didn't yet know what to expect.

It is a small thing. It costs almost nothing.

But I think a lot of what we call loneliness, or boredom, or the feeling that life has gone flat — some of that is just this. The world didn't get smaller. We just stopped looking at it.`;

export async function POST() {
  await initDb();
  const existing = await getAllDbPosts();

  if (!existing.find(p => p.slug === "mustang-and-the-lost-footage")) {
    await createDbPost({
      slug: "mustang-and-the-lost-footage",
      title: "Mustang and the Lost Footage",
      description: "I lost 80% of the clips I loved most from Mustang. What I didn't expect was what that loss would teach me.",
      content: mustangContent,
      cover_image: "/images/mustang/IMG_4989.jpg",
      tags: ["mustang", "travel", "nepal", "presence"],
      published: true,
    });
  }

  if (!existing.find(p => p.slug === "what-we-overlook")) {
    await createDbPost({
      slug: "what-we-overlook",
      title: "What We Overlook",
      description: "Familiarity presents itself as knowledge. But most of the time, it just means we stopped looking.",
      content: overlookContent,
      cover_image: "",
      tags: ["presence", "attention", "everyday"],
      published: true,
    });
  }

  return NextResponse.json({ message: "Seeded successfully" });
}
