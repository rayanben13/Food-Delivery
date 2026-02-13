import SectionTitle from "../../components/mainHeading/sectiontitle";

export default function About() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <SectionTitle title="About Our Pizza App" subTitle="Our Store" />

      <p style={{ color: "gray" }} className="text-lg leading-relaxed">
        Welcome to our Pizza App! We bake delicious pizzas with fresh
        ingredients and deliver happiness to your door. Our goal is to provide
        you the best pizza experience at the best price.
      </p>

      <section className="space-y-3 ">
        <h2 className="text-2xl font-semibold" style={{ color: "black" }}>
          Why Choose Us?
        </h2>
        <ul
          style={{ color: "gray" }}
          className="list-disc list-inside space-y-2"
        >
          <li>Fresh and premium ingredients</li>
          <li>Fast delivery within 30 minutes</li>
          <li>Affordable prices</li>
          <li>Customizable pizzas with unlimited toppings</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 style={{ color: "black" }} className="text-2xl font-semibold">
          Our Mission
        </h2>
        <p style={{ color: "gray" }} className="text-lg leading-relaxed">
          We’re here to make pizza ordering easier, faster, and more fun.
          Wherever you are – your favorite pizza is just one tap away!
        </p>
      </section>
    </main>
  );
}
