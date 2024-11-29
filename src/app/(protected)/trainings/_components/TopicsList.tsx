export function TopicList({
    topics,
}: {
    topics: { id: number; title: string; lessons: { id: number; title: string }[] }[];
}) {
    return (
        <div className="space-y-6">
            {topics.map((topic) => (
                <div key={topic.id} className="space-y-3">
                    <h4 className="text-lg font-medium text-gray-800">{topic.title}</h4>
                    <ul className="ml-6 space-y-1 text-sm text-gray-600">
                        {topic.lessons.map((lesson) => (
                            <li key={lesson.id}>- {lesson.title}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
