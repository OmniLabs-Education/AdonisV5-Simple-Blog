import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Posts from '../../Models/Post'

export default class PostsController {
  public async index ({}: HttpContextContract) {
    const posts = await Posts.all()

    return posts
  }

  public async store ({ request }: HttpContextContract) {
    const data = request.only(['title', 'description'])
    const post = await Posts.create(data);

    return post
  }

  public async show ({ params }: HttpContextContract) {
    const post = await Posts.findOrFail(params.id)

    return post
  }

  public async update ({request, params}: HttpContextContract) {
    const post = await Posts.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    post.merge(data)

    await post.save()

    return post

  }

  public async destroy ({params}: HttpContextContract) {
    const post = await Posts.findOrFail(params.id)

    await post.delete()
  }
}
