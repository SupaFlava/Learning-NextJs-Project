import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "the first meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sidi_Chebaan.jpg/1024px-Sidi_Chebaan.jpg",
    address: " 2345 Sidi Bou said ",
    description: "this is our first meetup",
  },
  {
    id: "m2",
    title: "the second meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Sidi_Chebaan.jpg/1024px-Sidi_Chebaan.jpg",
    address: " 2345 Sidi Bou said ",
    description: "this is our first meetup",
  },
];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React meetup</title>
        <meta
          name="description"
          content="Browse a huge list of highly actice react meetips"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};
export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://supa123:supa123@cluster0.e069q.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
};
export default HomePage;
