import initialData from '@/components/whiteboard/initialBoardData'
import Whiteboard from '@/components/whiteboard/Whiteboard'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { whiteboards } from '@prisma/client'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import useSWR from 'swr'

function WhiteboardPage() {
  const router = useRouter()
  const whiteboardId = router.query.whiteboardId?.toString()
  const { data, mutate } = useSWR<whiteboards>(
    `/api/whiteboard/get-board-data/?boardId=${whiteboardId}`
  )

  // useEffect(() => {

  // }, [])

  return (
    <div>
      {/* <script
        dangerouslySetInnerHTML={{
          __html: ``,
        }}
      /> */}
      {data && (
        <Whiteboard
          id={whiteboardId}
          initialData={{
            elements: JSON.parse(
              data?.elements || JSON.stringify(initialData.elements)
            )?.elements,
            appState: JSON.parse(
              data?.appState || JSON.stringify(initialData.appState)
            ),
          }}
          mutate={mutate}
        />
      )}
      {!data && <div>Loading...</div>}
      <div>
        <Toaster />
      </div>
    </div>
  )
}

export default WhiteboardPage