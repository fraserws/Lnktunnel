import { supabase } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      console.log(user);
      if (user) {
        const userId = user.data.user?.id;
        setIsAuthenticated(true);
        setUserId(userId);
      }
    };
    getUser();
  }, []);
  const addNewLink = async () => {
    try {
      if (title && url && userId) {
        const { data, error } = await supabase.from("links").insert({
          title: title,
          url: url,
          user_id: userId,
        });
        if (error) throw error;
        console.log("data:", data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 pt-5 ">
      {isAuthenticated && (
        <>
          <input
            type="text"
            placeholder="Some link Title"
            className="input-bordered input-secondary input w-full max-w-xs"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            type="url"
            placeholder="https://fraserws.dev"
            className="input-bordered input-secondary input w-full max-w-xs"
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
          <button className="btn" onClick={addNewLink}>
            Add new link
          </button>
        </>
      )}
    </div>
  );
}
