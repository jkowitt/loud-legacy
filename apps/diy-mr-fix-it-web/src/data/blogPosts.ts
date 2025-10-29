export type BlogPost = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  published: string;
  readTime: string;
  heroImage?: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Top 10 Spring Maintenance Tasks",
    excerpt:
      "Get ahead of spring repairs with a punch list that keeps your home safe, dry, and energy efficient.",
    slug: "top-10-spring-maintenance-tasks",
    category: "Seasonal",
    published: "Mar 12, 2024",
    readTime: "8 min read",
    content: `
Spring is the season of fresh starts, and your home deserves the same treatment. A focused weekend now prevents leaks, electrical surprises, and HVAC breakdowns when the first heat wave hits. This checklist is the exact order I follow every March to keep my own home tight and efficient.

## 1. Clear gutters and downspouts
Full gutters overflow into fascia boards and basements. Scoop out debris, flush the channels with a hose, and confirm the downspouts discharge at least five feet from the foundation.

## 2. Test sump pumps
Remove the sump cover, pour in a bucket of water, and ensure the float engages the pump smoothly. Add a battery backup if heavy storms are common in your area.

## 3. Inspect roof and flashing
Walk the perimeter with binoculars. Look for lifted shingles, missing drip edge, and gaps around chimneys or skylights. Spot sealing now saves costly interior drywall repairs later.

## 4. Tune the HVAC
Swap filters, vacuum the return vents, and schedule a professional clean-and-check before the summer rush. Ask the tech to measure static pressure so you know your ducts are healthy.

## 5. Reseal windows and doors
Check caulk lines, weatherstripping, and door sweeps. A few beads of caulk and a new sweep kit will shave dollars off every utility bill.

## 6. Flush the water heater
Sediment robs heating efficiency and shortens tank life. Power down, attach a hose to the drain valve, and flush until the water runs clear.

## 7. Reset exterior irrigation
Inspect sprinkler heads for cracks, adjust spray patterns, and run a low-pressure test before you turn the system on for the season.

## 8. Clean dryer vents
Pull the dryer away from the wall, disconnect the duct, and vacuum the entire run to the exterior vent. Lint buildup is a leading cause of house fires.

## 9. Check safety devices
Test smoke alarms, swap expiring CO detectors, and review fire extinguisher charge levels. Add a small extinguisher in the garage if you do not already have one.

## 10. Refresh landscaping beds
Prune dead growth, edge beds, and add two inches of mulch. Healthy landscaping sheds water away from the foundation and deters pests.

Work through this list over two weekends and your home will be ready for storm season. Print the checklist, check items off, and store it in a project binder so next spring is even easier.`
  },
  {
    title: "How to Fix a Leaky Faucet in 10 Minutes",
    excerpt:
      "Diagnose and repair the three most common faucet leaks with hand tools you already own.",
    slug: "fix-a-leaky-faucet",
    category: "Plumbing",
    published: "Jan 28, 2024",
    readTime: "6 min read",
    content: `
Dripping faucets can waste over 3,000 gallons of water a year. The good news: most leaks are caused by worn O-rings, cartridge seals, or loose packing nuts. Here is how to quiet the drip without replacing the entire fixture.

## Tools and materials
- Adjustable wrench or basin wrench
- Phillips and flat screwdrivers
- Allen key set
- Replacement cartridge or seat/spring kit matched to your faucet model
- Plumber's grease and a clean rag

## Step-by-step repair
1. **Shut off the water.** Close the hot and cold angle stops under the sink. Open the faucet to relieve pressure.
2. **Disassemble the handle.** Pry off the set screw cover, loosen the set screw with an Allen key, and lift the handle away. Remove the decorative cap and retaining screw if your model has one.
3. **Inspect the cartridge.** Lift the cartridge straight up. Check for obvious tears in the O-rings or mineral buildup around the seals. If your faucet uses seats and springs, use needle-nose pliers to pull them out.
4. **Replace worn components.** Install the new cartridge or seat kit following the orientation tabs. Lubricate O-rings with plumber's grease before seating them.
5. **Reassemble and test.** Reinstall the retaining hardware, set the handle, and gently tighten the set screw. Turn the supply valves on and test for leaks in both directions.

## When to call a pro
If the faucet body is corroded, the valve seats are scarred, or the shutoff valves refuse to close, call a licensed plumber. Upgrading the entire faucet might be the smarter long-term move.

Take photos during disassembly so reassembly is foolproof. Keep the part numbers in your home maintenance log; future repairs will go even faster.`
  },
  {
    title: "DIY vs Hiring: When to Call a Pro",
    excerpt:
      "Know when to pick up the wrench and when to bring in professional help to avoid bigger issues.",
    slug: "diy-vs-hiring",
    category: "Planning",
    published: "Dec 02, 2023",
    readTime: "9 min read",
    content: `
As empowering as DIY can be, there is a line where professional expertise protects your home, budget, and safety. I use a five-question framework before every major repair. If two or more answers push toward “hire it out,” I bring in a pro.

## 1. Is the work code-critical?
Projects involving electrical service panels, structural beams, or gas lines require permits and inspections. If you are not licensed, the legal and safety risks are high. Hire a pro.

## 2. What is the failure penalty?
Consider what happens if the repair fails. A dripping supply line is annoying. A miswired breaker can burn the house down. Use your best judgment and err on the side of caution.

## 3. Do you have the tools and time?
Buying a specialty tool for a one-off repair often costs more than the labor. Pros already own the right gear and can complete the work in hours instead of weekends.

## 4. Are there hidden conditions?
Water damage, mold, and pest infestations escalate fast. If you open a wall and find something you cannot confidently evaluate, pause and call in help to assess the damage.

## 5. Will DIY void a warranty?
Appliances, roofing, and HVAC systems may carry warranties that require authorized technicians. Read the fine print before you crack the casing.

## Build your pro bench
Interview contractors when your home is calm. Collect references, confirm licensing and insurance, and keep three go-to pros in each specialty stored in your phone. That way, when a job crosses the line, you can delegate immediately and protect the Loud Legacy you are building.`
  }
];
